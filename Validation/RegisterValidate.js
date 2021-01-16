//Import the validation module
const {check} = require('express-validator');

const RegisterValidate = [
    check('username').not().isEmpty().isLength({min:3}).trim().escape().withMessage('Username field is required and must have more than 3 character'),
    check('email', 'Your email is not valid!').not().isEmpty().isEmail().normalizeEmail(),
    check('password', 'password is required and must be more than 8 characters!').not().isEmpty().trim().escape().isLength({min: 8}),
];

module.exports = RegisterValidate;