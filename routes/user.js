const {Router} = require('express')
const {userGet, userDataGet, userPost, userPut, userDelete} = require("../controllers/user");
const {check} = require("express-validator");
const {
    validateFields,
    validateJWT,
    hasAdminRole,
    hasRole,
} = require("../middlewares")
const {isRoleValid, emailExists, userExistsByID} = require("../helpers/db-validations");

const router = Router()

//All application routes
//A single route references to controller

//User
router.get('/', userGet)
router.get('/:id', [
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(userExistsByID),
    validateFields
], userDataGet)
router.post('/', [
    validateJWT,
    hasRole('ADMIN', 'USER'),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required, 6 characteres min').isLength({min: 6}).not().isEmpty(),
    check('email').custom(emailExists),
    check('role').custom(isRoleValid),  //It`s the same as check('role').custom((role) => isRoleValid(role)),
    validateFields
], userPost)
router.put('/:id', [
    validateJWT,
    hasRole('ADMIN', 'USER'),
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(userExistsByID),
    check('role').custom(isRoleValid),
    validateFields
], userPut)
router.delete('/:id', [
    validateJWT,
    hasAdminRole,
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(userExistsByID),
    validateFields
], userDelete)

module.exports = router