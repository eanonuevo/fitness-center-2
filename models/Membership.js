const mongoose = require('mongoose')
const moment = require('moment')

const MembershipSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firstName: {
        type: String,
        required: [true, 'Please provide your first name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your valid email']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide your last name']
    },
    startingDate: {
        type: Date,
        required: [true, 'Please provide your starting date'],
        min: [moment().startOf('day').subtract(1, 'days'), 'Starting date must not be from the past']
    },
    plan: {
        type: mongoose.Types.ObjectId,
        ref: 'Plan',
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Please choose a plan'],
    },
    price: {
        type: Number,
        required: [true, 'Price must be included'],
    },
    validity: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'expired'],
        default: 'pending',
    }
}, { timestamps: true })

module.exports = mongoose.model('Membership', MembershipSchema)
