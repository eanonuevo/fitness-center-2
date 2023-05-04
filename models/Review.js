const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: [true, 'Please provide rating'],
        default: 5,
        min: [1, 'Rating must be between 1 to 5 only'],
        max: [5, 'Rating must be between 1 to 5 only'],
    },
    comment: {
        type: String,
        required: [true, 'Please provide comment on your review'],
    }
}, { timestamps: true })

module.exports = mongoose.model('Review', ReviewSchema)
