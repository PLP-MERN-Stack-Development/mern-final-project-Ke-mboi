// backend/models/Job.js
const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
  fundi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: { type: Number, required: true },
  message: { type: String, default: '' },
  date: { type: Date, default: Date.now }
});

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  location: { type: String, required: true },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bids: [BidSchema],
  acceptedBid: {                     // ← NEW: Winner of the job
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);