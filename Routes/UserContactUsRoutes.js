//Require the contact Us querybuilder
const UserContactUsController = require('../Controllers/UserContactUsController')
const contactuscontroller = new UserContactUsController();
//Import the validation module
const {check, validationResult} = require('express-validator');

class UserContactUsRoutes {
	constructor(app) {
		this.route = app;
	}

	showAll(api) {
		this.route.get(api, (req, res) => {
			//Hit the Query
			contactuscontroller.showAll(res);
		})
	}

	showOne(api) {
		this.route.get(api, (req, res) => {
			contactuscontroller.showOne(req, res);
		})
	}
	create(api) {
		//validate the input
		const validate = [
		check('name').not().isEmpty().isLength({min:3}).trim().escape().withMessage('Name Field is required and must have more than 3 character'),
		check('email', 'Your email is not valid!').not().isEmpty().isEmail().normalizeEmail(),
		check('message', 'Message is required').not().isEmpty().trim().escape().isLength({min: 5}),
		];

		this.route.post(api, validate, (req, res) => {
			//Invoke validation
			const errors = validationResult(req);
			if(!errors.isEmpty()){
					return res
						.status(422).jsonp(errors.array());
			 }else {

				//Controller and Querybuilder
				contactuscontroller.create(req, res);
			 }

		})
	}
}


module.exports = UserContactUsRoutes;