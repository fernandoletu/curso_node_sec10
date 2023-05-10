const {request, response} = require('express')
const User = require('../models/user')
const bcryptjs = require("bcryptjs");
const {generateJWT} = require("../helpers/generate-jwt");

//All methods for Auth

const login = async(req, res = response) => {
    const {email, password} = req.body

    try {
        //Check email exists
        const userDB = await User.findOne({email})
        if (!userDB) {
            return res.status(400).json({
                msg: 'Invalid user or password'
            })
        }

        //Check user status
        if (!userDB.status) {
            return res.status(400).json({
                msg: 'User does not exist'
            })
        }

        //Check password
        const passwordOk = bcryptjs.compareSync(password, userDB.password)
        if (!passwordOk) {
            return res.status(400).json({
                msg: 'Invalid user or password'
            })
        }

        //Create JWT
        const token = await generateJWT(userDB.id)

        return res.status(200).json({
            msg: 'Login ok',
            data: {
                token,
                user: userDB
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: error.message,
        })
    }
}

module.exports = {
    login,
}