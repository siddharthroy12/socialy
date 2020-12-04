const { AuthenticationError } = require('apollo-server')

const jwt = require('jsonwebtoken')

module.exports = (context) => {
    const authHeader = context.req.headers.authorization
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if (token) {
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET)
                return user
            } catch (err) {
                throw new AuthenticationError('Invalid token')
            }
        }

        throw new Error('Token not found')
    }

    throw new Error('Authentication header not found')
}