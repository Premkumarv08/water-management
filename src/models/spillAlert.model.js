const mongoose = require('mongoose');

const spillAlertSchema = new mongoose.Schema(
  {
    houseId: { type: mongoose.Schema.Types.ObjectId, ref: 'house', required: true },
    date: { type: Date, required: true },
    message: { type: String },
    resolved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('spillAlert', spillAlertSchema);
