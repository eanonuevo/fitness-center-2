const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'Please provide first name'],
        minlength: 3,
        maxlength: 30,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Please provide last name'],
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 5,
    },
    role: {
        type: String,
        enum: ['admin', 'trainer', 'user'],
        default: 'user',
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    membership: {
        type: mongoose.Types.ObjectId,
        ref: 'Membership',
    },
    passwordToken: {
        type: String,
    },
    passwordTokenExpirationDate: {
        type: Date,
    },
}, { timestamps: true })

// hash password
UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
// compare hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)
