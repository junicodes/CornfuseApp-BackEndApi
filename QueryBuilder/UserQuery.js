//import the database connection
const conn = require('../database/db_connect');

class UserQuery {
	getAll(req, res) {
		//SELECT QUERY
        conn.query('SELECT * FROM users', (err, rows) => {
		    if (err) throw err;
		    //pass it to users function and send as api
		    if (rows) {
	       	  return res
	            .status(200)
	            .json({
	                message: "Cornfuse App all Users",
	                results: rows
	            })
	        }
		});
	}
}
module.exports = UserQuery;