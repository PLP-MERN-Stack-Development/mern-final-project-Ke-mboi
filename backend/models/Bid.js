const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String },
  fundi: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },  // fix: ref 'Job'
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Bid', bidSchema);