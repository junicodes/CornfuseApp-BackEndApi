//Api end Points 

const UserQuery = require('../QueryBuilder/UserQuery')
const userquery = new UserQuery();
//Import the validation module
const {check, validationResult} = require('express-validator');
class UserApi {
	constructor(app) {
	this.route = app;
	}
	//Get All users
	routeShowAll(api) {
	  this.route.get(api, (req, res) =>
	    {
	      //Query the database
	      userquery.showAll(req, res);
	    })

	}
	routeShowOne(api) {
		this.route.get(api, (req, res) => {
			//Query the database
			const id = parseInt(req.params.id, 10);
			console.log(id);
			//this key permit in comming request onli for this route
			const key = 1;
			userquery.showOne(id, key, req, res);
		})
	}
	routeCreate(api) {
		//validate the input
		const validate = [
			check('username').not().isEmpty().isLength({min:3}).trim().escape().withMessage('Name Field is required and must have more than 3 character'),
			check('email', 'Your email is not valid!').not().isEmpty().isEmail().normalizeEmail(),
			check('password', 'password is required').not().isEmpty().trim().escape().isLength({min: 8}),
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
	routeDelete(api) {
		this.route.delete(api, (req, res) => {
			const id = parseInt(req.params.id, 10);
			console.log(id);
			userquery.destroy(id, req, res);
		})
	}
}

module.exports = UserApi;

