const mongoose = require('mongoose');

/**
 * Candidate Schema
 * Stores candidate referral information
 */
const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Candidate name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    jobTitle: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Reviewed', 'Hired'], // Only these three values are allowed
        default: 'Pending' // Default status for new candidates
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User who referred this candidate
        required: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Candidate', candidateSchema);
