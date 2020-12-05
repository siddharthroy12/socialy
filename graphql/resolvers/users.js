const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server-express');

const User = require('../../models/User')
const { validateRegisterInput, validateLoginInput } = require('../../utils/validation')

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt
    }, process.env.JWT_SECRET, { expiresIn: '24h'})
}

module.exports= {
    Mutation: {
        async login(_, {username, password}){
            // Validate user data
            const { valid, errors } = validateLoginInput(
                username, password
            )
            if(!valid){
                throw new UserInputError('Errors', { errors })
            }
            // Make sure user exist
            const user = await User.findOne({ username })
            if (!user) {
                errors.general = 'User not found'
                throw new UserInputError('User not found', { errors })
            }
            // Match passwords
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                errors.general = 'Wrong credentaials'
                throw new UserInputError('Wrong credentaials', { errors })
            }
            const token = generateToken(user)
            
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(_, {
            registerInput: { username, email, password, confirmPassword }
        }){
            // Validate user data
            const { valid, errors } = validateRegisterInput(
                username, email, password, confirmPassword
            )
            if (!valid){
                throw new UserInputError('Errors', { errors })
            }
            // Make sure user doesnt exist
            const user = await User.findOne({username})
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }
            // Hast password and create an auth token
            password = await bcrypt.hash(password, 12)
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })
            const res = await newUser.save()
            const token = generateToken(res)
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}