
const jwt = require('jsonwebtoken');

const userRole = {

	admin: {
		role: 0,
		type: 'admin',
	},
	user:  {
		role: 1,
		type: 'user',
	},
	guest:  {
		role: 2,
		type: 'guest',
	},

}

const generateAuthToken = async (user, password) => {
	const validUser = await user.authenticate(password);
	if(validUser) {
		const payload = {id: validUser.id};
		const token = jwt.sign(payload, process.env.SECRET_OR_KEY, {
			expiresIn: 60080
		});
		return token;
	}

}




module.exports =  {
	userRole,
	generateAuthToken
};