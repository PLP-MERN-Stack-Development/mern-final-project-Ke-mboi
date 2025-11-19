const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const protect = require('../middleware/auth');

// CREATE JOB
router.post('/', protect, async (req, res) => {
  try {
    const newJob = new Job({
      title: req.body.title,
      description: req.body.description,
      budget: req.body.budget,
      location: req.body.location,
      postedBy: req.user.id
    });
    const job = await newJob.save();
    await job.populate('postedBy', 'name');
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// GET ALL JOBS
router.get('/', protect, async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('postedBy', 'name')
      .populate('bids.fundi', 'name')
      .populate('acceptedBid', 'name')
      .sort({ date: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET SINGLE JOB
router.get('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name')
      .populate('bids.fundi', 'name')
      .populate('acceptedBid', 'name');
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// PLACE BID — FINAL BULLETPROOF VERSION (THIS ONE WORKS FOREVER)
router.post('/:id/bids', protect, async (req, res) => {
  try {
    console.log("Bid attempt by user:", req.user.id);

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    // Prevent self-bidding
    if (job.postedBy.toString() === req.user.id) {
      return res.status(400).json({ msg: 'You cannot bid on your own job' });
    }

    // SAFE DUPLICATE CHECK — THIS WAS THE KILLER BUG
    const alreadyBid = job.bids.some(bid => 
      bid.fundi && bid.fundi.toString() === req.user.id
    );
    if (alreadyBid) {
      return res.status(400).json({ msg: 'You have already placed a bid on this job' });
    }

    // Safe amount
    const amount = parseFloat(req.body.amount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ msg: 'Please enter a valid amount' });
    }

    job.bids.push({
      fundi: req.user.id,
      amount: amount,
      message: req.body.message?.trim() || ''
    });

    await job.save();

    // Populate after saving
    await job.populate('postedBy', 'name');
    await job.populate('bids.fundi', 'name');
    await job.populate('acceptedBid', 'name');

    console.log("BID PLACED SUCCESSFULLY!");
    res.json(job);

  } catch (err) {
    console.error("BID ERROR:", err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ACCEPT BID — FINAL FIXED
router.post('/:id/accept', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Only the job poster can accept bids' });
    }

    const fundiId = req.body.fundiId;
    if (!fundiId) return res.status(400).json({ msg: 'fundiId is required' });

    const validBid = job.bids.some(bid => bid.fundi.toString() === fundiId);
    if (!validBid) return res.status(400).json({ msg: 'This fundi did not place a bid' });

    job.acceptedBid = fundiId;
    await job.save();

    await job.populate('acceptedBid', 'name');
    await job.populate('bids.fundi', 'name');
    await job.populate('postedBy', 'name');

    res.json(job);
  } catch (err) {
    console.error("ACCEPT BID ERROR:", err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET MY BIDS (FUNDI)
router.get('/my-bids', protect, async (req, res) => {
  try {
    const jobs = await Job.find({ 'bids.fundi': req.user.id })
      .populate('postedBy', 'name')
      .populate('bids.fundi', 'name')
      .populate('acceptedBid', 'name');
    res.json(jobs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;