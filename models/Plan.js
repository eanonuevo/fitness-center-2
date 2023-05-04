const mongoose = require('mongoose')

const PlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide plan name'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Please provide price"],
        default: 1000,
    },
    months: {
        type: Number,
        required: [true, "Please provide how many months"],
        min: 1,
        default: 1,
    },
    description: {
        type: String,
        required: [true, 'Please provide plan description'],
        maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model('Plan', PlanSchema)
