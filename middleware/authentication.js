const CustomError = require('../errors')
const { isTokenValid } = require('../utils')

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token
    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }

    try {
        // payload
        const { firstName, lastName, email, userId, role } = isTokenValid({ token })
        req.user = { firstName, lastName, email, userId, role }
        next()
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }
}

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.UnauthorizedError('Unauthorize to access this route')
        }
        next()
    }
}   

module.exports = {
    authenticateUser,
    authorizePermissions,

}
