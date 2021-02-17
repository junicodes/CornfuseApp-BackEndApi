//import the database connection
const User = require('../Models/UserModel');
const dotenv = require('dotenv');
dotenv.config();
//Import the validation module
const {validationResult} = require('express-validator');
const {error501} = require('../configs/apiResponseMessage');
const {generateAuthToken} = require('../configs/config');

class UserController {

	showAll(req, res) {

     	new User().fetchPage({
				pageSize: 50, // Defaults to 10 if not specified
				page: Number(req.params.page) 
			})
			.then(rows => {
				return res.status(200).json({
					status: true,
					message: "Cornfuse App users",
					nextPage: Number(req.params.page) + 1,
					results: rows
				});
			}).catch(err => {
				return res.status(501).json(error501(err));
			});
	}
	
	showCurrent(req, res) {
		if (req.user) {
			return res.status(200).json({
				status: true,
				message: 'User info for user',
				results: req.user
			});
		}
		return res.status(501).json(error501(err));
	}

	showOne(req, res) {
			const id = parseInt(req.params.id, 10);

			if (req.params.id) {
				return res.status(400).json({
					status: false,
					message: 'User id is missing!'
				})
			}

			User.where('id', id).fetch()
			.then(rows => {
				return res.status(200).json({
					success: true,
					message: 'User info for user',
					results: rows
				});
			})
			.catch(err => {
				return res.status(501).json(error501(err));
			})
	}

	create(req, res) {
		const errors = validationResult(req);
		if( !errors.isEmpty() ) { return res.status(422).jsonp(errors.array()); }

	    const values = {
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
			}

		new User(values).save()
		.then(rows => {
			if (rows) {
				return res.status(201).json({
					success: true,
					message: "User account created successfully!",
					results: rows
				})
			}
		}).catch(err => {
			if (err.code == 'ER_DUP_ENTRY') {
				return res.status(400).json({
					message: 'User already exist, please choose another username and email!',
					hint: err
				})
			} 
			return res.status(501).json(error501(err));
		})
	}


	
	async signIn(req, res) {
		const errors = validationResult(req);
		if( !errors.isEmpty() ) { return res.status(422).jsonp( errors.array()); }

		try {
			const user = await new User().query({
				where: { username: `${req.body.authType}`},
				orWhere: { email: `${req.body.authType}`}
				}).fetch();

			const token = await generateAuthToken(user, req.body.password);

			if(token) {
				res.status(200).json({
					status: true,
					message: 'Sign in successfully!',
					user,
					token: `Bearer ${token}`
				});
			}
			
		} catch (err) {
			return res.status(404).json({
				status: false,
				message: 'User not found, please check your login credentials and try again',
				hint: 'If problem persist and you think it is a fault please contact admin support to resolve this issue'
			})
		}
			
	}

	destroyCurrent(req, res) {
		User.where('id', req.user.id).destroy()
		.then(results => {
			return res.status(200)
				.json({
					message: 'User deleted',
					results: results
				})
		})
		.catch(err => {
			return res.status(501).json(error501(err));
		})
	}

	destroyOther(req, res) {

		if (!Number(req.params.id)) {
			return res.status(400).json({
				status: false,
				message: 'User id is missing!'
			});
		}

		User.where('id', Number(req.params.id)).destroy()
			.then(results => {
				return res.status(200)
					.json({
						message: 'User deleted',
						results: results
					})
			})
			.catch(err => {
				return res.status(501).json(error501(err));
			})
	}
	
}
module.exports = new UserController();
































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