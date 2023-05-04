const express = require('express')
const router = express.Router()
// const rateLimiter = require('express-rate-limit')
const { register, login, logout, forgotPassword, resetPassword } = require('../controllers/authController')

// const apiLimiter = rateLimiter({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 10,
//   message: 'Too many requests from this IP, please try again after 15 minutes',
// })

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password').post(resetPassword)

module.exports = router
