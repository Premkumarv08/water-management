const mongoose = require('mongoose');

const waterMeterSchema = mongoose.Schema(
    {
        houseId: { type: String },
        totalLiters: { type: Number },
        previousLiter: { type: Number },
        liters: { type: Array }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('waterMeter', waterMeterSchema);