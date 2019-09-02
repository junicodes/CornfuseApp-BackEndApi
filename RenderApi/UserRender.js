//Api end Points 

const UserQuery = require('../QueryBuilder/UserQuery')
const userquery = new UserQuery();
//Import the validation module
const {check, validationResult} = require('express-validator');
class UserApi {
	constructor(app, passport) {
	this.route = app;
	this.passport = passport.authenticate('jwt', {session: false});
	}
	//Get All users
	showAll(api) {
	  this.route.get(api, this.passport, (req, res) =>
	    {
	      //Query the database
	      userquery.showAll(req, res);
	    })

	}
	showOne(api) {
		this.route.get(api, this.passport, (req, res) => {
			//Query the database;
			userquery.showOne(req, res);
		})
	}
	signUp(api) {
		//validate the input
		const validate = [
			check('username').not().isEmpty().isLength({min:3}).trim().escape().withMessage('Username field is required and must have more than 3 character'),
			check('email', 'Your email is not valid!').not().isEmpty().isEmail().normalizeEmail(),
			check('password', 'password is required!').not().isEmpty().trim().escape().isLength({min: 8}),
		];

		this.route.post(api, validate, (req, res) => {
			//Invoke validation
			const errors = validationResult(req);
			if(!errors.isEmpty()){
					return res
						.status(422).jsonp(errors.array());
			 }else {

				//Querybuilder
				userquery.create(req, res);
			 }
		})
	}
	signIn(api) {
		const validate = [
			check('username').not().isEmpty().isLength({min:3}).trim().escape().withMessage('Username field is required and must have more than 3 character'),
			check('password', 'password is required!').not().isEmpty().trim().escape().isLength({min: 8}),
		];
		this.route.post(api, validate, (req, res) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res
					.status(422).jsonp(errors.array());
			}else {
				//Querybuilder
				userquery.signIn(req, res);
			}
		})
	}
	delete(api) {
		this.route.delete(api, this.passport, (req, res) => {
			userquery.destroy(req, res);
		})
	}
}

module.exports = UserApi;

