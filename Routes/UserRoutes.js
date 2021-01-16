//Api end Points 

const UserController = require('../Controllers/UserController')
const usercontroller = new UserController();
//Import the validation module
const {check, validationResult} = require('express-validator');


class UserRoutes {

	constructor(router, passport) {
		this.router = router;
		this.passport = passport.authenticate('jwt', {session: false});
	}
	//Get All users
	showAll(api) {
	  this.router.get(api, this.passport, (req, res) =>
	    {
	      //controller the database
	      usercontroller.showAll(req, res);
	    })

	}
	showCurrent(api) {
		this.router.get(api, this.passport, (req, res) => {
			//controller the database;
			usercontroller.showCurrent(req, res);
		})
	}
	showOne(api) {
		this.router.get(api, this.passport, (req, res) => {
			//controller the database;
			usercontroller.showOne(req, res);
		})
	}
	signUp(api) {
		//validate the input
		const validate = [
			check('username').not().isEmpty().isLength({min:3}).trim().escape().withMessage('Username field is required and must have more than 3 character'),
			check('email', 'Your email is not valid!').not().isEmpty().isEmail().normalizeEmail(),
			check('password', 'password is required and must be more than 8 characters!').not().isEmpty().trim().escape().isLength({min: 8}),
		];

		this.router.post(api, validate, (req, res) => {
			//Invoke validation
			const errors = validationResult(req);
			if(!errors.isEmpty()){
					return res
						.status(422).jsonp(errors.array());
			 }else {

				//controllerbuilder
				usercontroller.create(req, res);
			 }
		})
	}
	signIn(api) {
	
		this.router.post(api, validate, (req, res) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res
					.status(422).jsonp(errors.array());
			}else {
				//controllerbuilder
				usercontroller.signIn(req, res);
			}
		})
	}
	delete(api) {
		this.router.delete(api, this.passport, (req, res) => {
			usercontroller.destroy(req, res);
		})
	}
}

module.exports = UserRoutes;

