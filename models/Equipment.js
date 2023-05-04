const mongoose = require('mongoose')

const EquipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please provide equipment name'],
        trim: true,
    },
    quantity: {
        type: Number,
        require: [true, 'Please provide equipment quantity'],
        default: 1,
        minlength: 0,
    },
    image: {
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Equipment', EquipmentSchema)
