const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser, sendResetPassword } = require('../utils')
const crypto = require('crypto');

const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    // check if all fields have values
    if (!firstName || !lastName || !email || !password) {
        throw new CustomError.BadRequestError('Please provide all fields')
    }
    // check for unique email
    const emailAlreadyExists = await User.findOne({ email })
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists, try another email')
    }
    // 1st user account will be admin
    const isFirstAccount = await User.countDocuments({}) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    // admin should have status 'active'
    const status = role === 'admin' ? 'active' : 'inactive'

    // create user account
    const user = await User.create({ firstName, lastName, email, password, role, status })
    const createdUser = { firstName: user.firstName, lastName: user.lastName, email: user.email }
    
    res.status(StatusCodes.CREATED).json({ user: createdUser })
}

const login = async (req, res) => {
    const { email, password } = req.body
    // check if all fields have values
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password')
    }
    // check if user's account exist in DB
    const user = await User.findOne({ email })
    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid credentials')
    }
    // compare passwords
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid credentials')
    }
    // jwt and cookie
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser })

    res.status(StatusCodes.OK).json({ user: tokenUser })
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.status(StatusCodes.OK).json({ msg: 'user logged out' })
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new CustomError.BadRequestError('Please provide valid email');
    }

    const user = await User.findOne({ email });

    if (user) {
        const passwordToken = crypto.randomBytes(70).toString('hex');
        // send email
        const origin = 'https://fourtigersfitness.herokuapp.com';
        await sendResetPassword({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: passwordToken,
            origin,
        });

        const tenMinutes = 1000 * 60 * 10;
        const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

        user.passwordToken = passwordToken;
        user.passwordTokenExpirationDate = passwordTokenExpirationDate;
        await user.save();
    }

    res
        .status(StatusCodes.OK)
        .json({ msg: 'Please check your email for reset password link' });
}

const resetPassword = async (req, res) => {
    const { token, email, password } = req.body;

    if(!password) {
        throw new CustomError.BadRequestError('Please provide your new password')
    }

    if (!token || !email) {
        throw new CustomError.BadRequestError('Insufficient values');
    }
    
    const user = await User.findOne({ email });

    if (user) {
        const currentDate = new Date();

        if (
        user.passwordToken === token &&
        user.passwordTokenExpirationDate > currentDate
        ) {
        user.password = password;
        user.passwordToken = null;
        user.passwordTokenExpirationDate = null;
        await user.save();
        }
    }

    res.status(StatusCodes.OK).send('reset password')
}

module.exports = { register, login, logout, forgotPassword, resetPassword }
