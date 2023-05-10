const {response} = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

//Check if session user has ADMIN role
const hasAdminRole = async(req = request, res = response, next) => {
    if (!req.sessionUser) {
        return res.status(500).json({
            msg: 'User not found'
        })
    }

    const {role, name} = req.sessionUser

    if (role !== 'ADMIN') {
        return res.status(401).json({
            msg: `Unauthorized - ${name} is not an administrator`
        })
    }

    next()
}

//Check if session user has specific roles
const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.sessionUser) {
            return res.status(500).json({
                msg: 'User not found'
            })
        }

        if (!roles.includes((req.sessionUser.role))) {
            return res.status(401).json({
                msg: `Unauthorized - ${roles} roles are only allowed`
            })
        }

        next()
    }
}

module.exports = {
    hasAdminRole,
    hasRole,
}