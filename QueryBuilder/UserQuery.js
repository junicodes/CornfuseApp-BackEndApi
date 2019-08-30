//import the database connection
const knex = require('knex')(require('../knexfile'))

class UserQuery {
	showAll(req, res) {
		//SELECT QUERY
     	knex('users').select('*')
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
	showOne(id, key, req, res) {
		knex('users').where('id', id)
		.then(rows => {
			if (key == 0) {
				return res.status(201)
				.json({
					success: true,
					message: "user created successfully!",
					results: rows
				})
			}else if(key == 1){
				return res.status(200)
				.json({
					success: true,
					message: 'User info for user',
					results: rows
				})
			}
		})
		.catch(err => {
				return res.status(500)
				.json({
					error: true,
					message: 'An error occured while showing user',
					hint: err
				})
		})
	}
	create(req, res) {
	 const	values = {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		}
		knex('users').insert(values)
		.then(rows => {
			if (rows) {
				const key = 0;
				this.showOne(rows[0], key, req, res);
			}
		})
		.catch(err => {
			return res
			.status(500)
			.json({
				message: 'An error ocurred while creating user, please try agin',
				hint: err
			})
		})
	}
	destroy(id, req, res) {
		knex('users').where('id', id).del()
		.then(results => {
			return res.status(200)
				.json({
					message: 'User deleted',
					results: results
				})
		})
		.catch(err => {
			return res.status(500)
				.json({
					message: 'And error occured while deleting user',
					hint: err
				})
		})
	}
}
module.exports = UserQuery;
































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