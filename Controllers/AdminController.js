//Import knex connection
const knex = require('knex')(require('../knexfile'))
const Admin = require('../Models/AdminModel') 
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

class AdminController {
  create(req, res) {
  	const values = {
  		username: req.body.username,
  		email: req.body.email,
  		password: req.body.password,
  	}
  	new Admin(values).save()
  	.then(rows => {
  		if (rows) {
  			return res.status(201)
  			.json({
  				sucess: true,
  				message: "Admin account created successfully!",
  				results: rows
  			})
  		}
  	})
  	.catch(err => {
  		if (err.code == 'ER_DUP_ENTRY') {
  			return res.status(400)
  			.json({
  				message: 'Admin account already exist',
  				hint: err
  			})
  		}
  		return res 
  		.status(500)
  		.json({
  			message: 'An Error ocurred while creating account, please try again',
  			hint: err
  		})
  	})
  }
  signIn(req, res) {

  	new Admin()
  		.query({
  			where: {username: `${req.body.username}`},
  			orWhere: {email: `${req.body.username}`}
  			}).fetch().then(result => {
  				if (!result) {
  					return res.status(404)
  					.json({
  						message: 'Admin account not found'
  					})
  				}
  				result.authenticate(req.body.password)
  						.then(admin => {
  							const payload = {id: admin.id};
  							const token = jwt.sign(payload, process.env.SECRET_OR_KEY, {
  								expiresIn: 10080
  							})
  								res.json({
									message: 'Sign in successfully!',
									admin: result,
									token: `Bearer ${token}`
								 });
  						})
  			});
  }
}

module.exports = AdminController;