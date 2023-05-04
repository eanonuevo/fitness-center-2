const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt')
const createTokenUser = require('./createTokenUser')
const checkPermissions = require('./checkPermissions')
const sendResetPassword = require('./sendResetPassword')

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
    createTokenUser,
    checkPermissions,
    sendResetPassword,
}
