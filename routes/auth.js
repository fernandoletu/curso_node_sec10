const {Router} = require('express')
const {login} = require("../controllers/auth");
const {check} = require("express-validator");
const {
    validateFields
} = require("../middlewares")

const router = Router()

//All application routes
//A single route references to controller

//Auth
router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login)

module.exports = router