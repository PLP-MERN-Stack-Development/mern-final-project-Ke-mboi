// backend/controllers/jobController.js
const Job = require('../models/Job');

// @desc    Create new job
// @access  Private
exports.createJob = async (req, res) => {
  try {
    const { title, description, location, budget } = req.body;

    const job = new Job({
      title,
      description,
      location,
      budget,
      postedBy: req.user.id || req.user._id   // works with both
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Get all jobs
// @access  Public
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name email').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};