//import the database connection
const knex = require('knex')(require('../knexfile'))
const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class UserController {
	showAll(req, res) {
		//SELECT QUERY
     	User.fetchAll()
     	.then(rows => {
	 		 return res
	            .status(200)
	            .json({
	                message: "Cornfuse App all Users",
	                results: rows
	            })
     	}).catch(err => {
     		return res
	            .status(500)
	            .json({
	                message: "An error occured!",
	                hint: err
	            })
     	})
	}
	showCurrent(req, res) {
		if (req.user) {
			return res.status(200)
			.json({
				success: true,
				message: 'User info for user',
				results: req.user
			})
		}else {
			return res.status(501)
				.json({
					error: true,
					message: 'An error occured while showing user or invalid token!',
				})
		}
	}

	showOne(req, res) {
		if (req.params.id) {
			const id = parseInt(req.params.id, 10);
			User.where('id', id).fetch()
			.then(rows => {
				return res.status(200)
				.json({
					success: true,
					message: 'User info for user',
					results: rows
				})
			})
			.catch(err => {
					return res.status(501)
					.json({
						error: true,
						message: 'An error occured while showing user',
						hint: err
					})
			})
		}
	}

	create(req, res) {
	 const	values = {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		}
		new User(values).save()
		.then(rows => {
			if (rows) {
				return res.status(201)
				.json({
					success: true,
					message: "User account created successfully!",
					results: rows
				})
			}
		})
		.catch(err => {
			if (err.code == 'ER_DUP_ENTRY') {
				return res
				.status(400)
				.json({
					message: 'User already exist, please choose another username and email!',
					hint: err
				})
			}
			return res
			.status(501)
			.json({
				message: 'An error ocurred while creating user, please try again!',
				hint: err
			})
		})
	}
	signIn(req, res) {
		// User.forge({username: req.body.username}).fetch().then(result => {
		new User()
			.query({
			    where: { username: `${req.body.username}`},
			    orWhere: { email: `${req.body.username}` }
			}).fetch().then(result => {

			if (!result) {
				return res.status(404)
					    .json({
					    	message: 'User not found, please check your username or password and try again'
					    })
			}
		result.authenticate(req.body.password)
			.then(user => {
				const payload = {id: user.id };
				const token = jwt.sign(payload, process.env.SECRET_OR_KEY, {
					expiresIn: 10080
				});
				res.json({
					message: 'Sign in successfully!',
					user: result,
					token: `Bearer ${token}`
				 });
			})
			.catch(err => {

				if (err.name == 'PasswordMismatchError') {
					return res.status(404)
					.json({
						message: 'User not found, please check your username or password and try again'
					})
				}
					return res.status(401)
					.json({
						message: 'An Error occured, while authenticating user, please try again!',
						err: err
					});
			})
	});
	}
	destroy(req, res) {
		const id = req.user.id;
		User.where('id', id).destroy()
		.then(results => {
			return res.status(200)
				.json({
					message: 'User deleted',
					results: results
				})
		})
		.catch(err => {
			return res.status(501)
				.json({
					message: 'And error occured while deleting user',
					hint: err
				})
		})
	}
	
}
module.exports = UserController;
































// //import the database connection
// const conn = require('../database/db_connect');

// class UserQuery {
// 	getAll(req, res) {
// 		//SELECT QUERY
//         conn.query('SELECT * FROM users', (err, rows) => {
// 		    if (err) throw err;
// 		    //pass it to users function and send as api
// 		    if (rows) {
// 	       	  return res
// 	            .status(200)
// 	            .json({
// 	                message: "Cornfuse App all Users",
// 	                results: rows
// 	            })
// 	        }
// 		});
// 	}
// }
// module.exports = UserQuery;