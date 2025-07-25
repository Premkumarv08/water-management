const mongoose = require("mongoose");

const dailyUsageSchema = new mongoose.Schema({
  houseId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  litersUsed: {
    type: Number,
    required: true,
    default: 0,
  },
});

dailyUsageSchema.index({ houseId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DailyUsage", dailyUsageSchema);
