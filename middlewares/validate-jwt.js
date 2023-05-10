const {response} = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'Token absent'
        })
    }

    //Validates token
    try {
        //If ok, executes next(), otherwise catches error
        const {uid} = jwt.verify(token, process.env.JWT_SECRET_KEY)

        //Get the user and check if active
        const sessionUser = await User.findById(uid)

        if (!sessionUser) {
            return res.status(401).json({
                msg: 'Token invalid'
            })
        }

        if (!sessionUser.status) {
            return res.status(401).json({
                msg: 'Token invalid'
            })
        }

        //Save session user data in 'requests'
        req.sessionUser = sessionUser

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Token invalid'
        })
    }
}

module.exports = {
    validateJWT,
}