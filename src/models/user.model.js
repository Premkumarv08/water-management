const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
            match: /^[6-9]\d{9}$/
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: /^\S+@\S+\.\S+$/
        },
        userRole: {
            type: String,
            enum: ['ADMIN', 'USER'],
            default: 'USER'
        },
        DOB: {
            type: Date,
        },
        gender: {
            type: String,
            enum: ['MALE', 'FEMALE', 'OTHER'],
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
