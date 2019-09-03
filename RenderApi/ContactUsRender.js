//Require the contact Us querybuilder
const ContactUsQuery = require('../QueryBuilder/ContactUsQuery')
const contactusquery = new ContactUsQuery();
//Import the validation module
const {check, validationResult} = require('express-validator');

class ContactUsRender {
	constructor(app) {
		this.route = app;
	}

	showAll(api) {
		this.route.get(api, (req, res) => {
			//Hit the Query
			contactusquery.showAll(res);
		})
	}

	showOne(api) {
		this.route.get(api, (req, res) => {
			contactusquery.showOne(req, res);
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

				//Querybuilder
				contactusquery.create(req, res);
			 }

		})
	}
}


module.exports = ContactUsRender;