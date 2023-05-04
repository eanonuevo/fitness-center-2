const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createTokenUser, attachCookiesToResponse, checkPermissions } = require('../utils')

const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password -membership -role').sort({ createdAt: -1 })
    res.status(StatusCodes.OK).json({ users })
}

const getAllTrainers = async (req, res) => {
    const trainers = await User.find({ role: 'trainer' }).select('-password')
    res.status(StatusCodes.OK).json({ trainers })
}

const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password')
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`)
    }
    checkPermissions(req.user, user._id)

    res.status(StatusCodes.OK).json({ user })
}

const getSingleTrainer = async (req, res) => {
    const trainer = await User.findOne({ role: 'trainer', _id: req.params.id }).select('-password')
    if (!trainer) {
        throw new CustomError.NotFoundError(`No trainer with id: ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({ trainer })
}

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUser = async (req, res) => {
    const { firstName, lastName, email } = req.body
    if (!firstName || !lastName || !email) {
        throw new CustomError.BadRequestError('Please provide all values')
    }

    const user = await User.findOneAndUpdate(
        { _id: req.user.userId },
        { firstName, lastName, email },
        { new: true, runValidators: true }
    )

    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser })

    res.status(StatusCodes.OK).json({ user: tokenUser })
}

const updateUserStatus = async (req, res) => {
    const { id: memberId } = req.params
    const { status } = req.body

    if (!status) {
        throw new CustomError.BadRequestError('Please provide member status')
    }

    const member = await User.findOneAndUpdate(
        { _id: memberId },
        { status },
        { new: true, runValidators: true }
    )

    res.status(StatusCodes.OK).json({ member })
}

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body 
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide both values')
    }
    const user = await User.findOne({ _id: req.user.userId })

    const isPasswordCorrect = await user.comparePassword(oldPassword)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    
    user.password = newPassword
    await user.save()

    res.status(StatusCodes.OK).json({ msg: 'Success! Password updated' })
}

const deleteUser = async (req, res) => {
    const { id: userId } = req.params

    const user = await User.findOne({ _id: userId })

    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${userId}`)
    }

    await user.remove()
    res.status(StatusCodes.OK).json({ msg: 'Success! User deleted' })
}

const getUserStatusStats = async (req, res) => {
    let stats = await User.aggregate([
        { $match: { role: "user" } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
    ])

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr
        acc[title] = count
        return acc
    }, {})

    const defaultStats = {
        active: stats.active || 0,
        inactive: stats.inactive || 0,
    }

    res.status(StatusCodes.OK).json({ defaultStats })
}

module.exports = {
    getAllUsers,
    getAllTrainers,
    getSingleUser,
    getSingleTrainer,
    showCurrentUser,
    updateUser,
    updateUserStatus,
    updateUserPassword,
    deleteUser,
    getUserStatusStats,
}
