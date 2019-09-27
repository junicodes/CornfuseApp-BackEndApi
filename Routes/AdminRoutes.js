 //Admin Api Routes

const AdminController = require('../Controllers/AdminController');
const admincontroller = new AdminController();

//Import the validation module
const {check, validationResult} = require('express-validator');

class AdminRoutes{
	
	constructor(app, passport) {
		this.route = app;
		this.passport = passport.authenticate('jwt', {session: false});
	}
	//Create admin 
	signUp(api) {
		const validate = [
			check('username').not().isEmpty().isLength({min:3}).trim().escape().withMessage('username field is required and must have more than 3 character!'),
			check('email', 'Your email is not valid!').not().isEmpty().isEmail().normalizeEmail(),
			check('password', 'password is required and must be more than 8 characters!').not().isEmpty().trim().escape().isLength({min: 8}),
		];

		this.route.post(api, validate, (req, res) => {
			//Invoke validation
			const errors = validationResult(req)

			errors.isEmpty() ? admincontroller.create(req, res) : res.status(422).jsonp(error.array())
		})
	}

	signIn(api) {
		const validate = [
			check('username').not().isEmpty().isLength({min:3}).trim().escape().withMessage('username field is required and must be more than 3 characters!'),
			check('password', 'password is required!').not().isEmpty().isLength({min:8}).trim().escape(),
		];

		this.route.post(api, validate, (req, res) => {
			const errors = validationResult(req);	
			errors.isEmpty()? admincontroller.signIn(req, res) : res.status(422).jsonp(errors.array())
		})
	}
}

module.exports = AdminRoutes;
	