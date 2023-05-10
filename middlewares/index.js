const validateFields = require("../middlewares/validations");
const validateJWT = require("../middlewares/validate-jwt");
const validateRoles = require("../middlewares/validate-role");

//Imports and exports all middleware methods
s
module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
}