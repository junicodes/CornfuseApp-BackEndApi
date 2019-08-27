//Api end Points 

const UserQuery = require('../QueryBuilder/UserQuery')
const userquery = new UserQuery();
class UserApi {
	constructor(app) {
	this.route = app;
	}
	//Get All users
	getAll(api) {
	  this.route.get(api, (req, res) =>
	    {
	      //Query the database
	      userquery.getAll(req, res);
	    })

	}
}

module.exports = UserApi;

