//Import the validation module
const {check} = require('express-validator');

const LoginValidate = [
    check('authType').not().isEmpty().isLength({min:3}).trim().escape().withMessage('Username field is required and must have more than 3 character'),
    check('password', 'password is required!').not().isEmpty().trim().escape().isLength({min: 8}),
];

module.exports = LoginValidate;