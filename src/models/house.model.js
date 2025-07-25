const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        mobile: {
            type: String,
        },
        email: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        pincode: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('house', houseSchema);
