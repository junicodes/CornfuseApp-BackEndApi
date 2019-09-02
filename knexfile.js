const dotenv = require('dotenv');
dotenv.config();

if (process.env.ENVIRONMENT == 'development') {
	const config = {
	client: process.env.CLIENT_DEV,
	connection: {
		host: process.env.HOST_DEV,
		user: process.env.USER_DEV,
		password: process.env.PASSWORD_DEV,
		database: process.env.DATABASE_DEV
		},
		pool: {min: 0, max: 7}
	}
	module.exports = config;
}else if (process.env.ENVIRONMENT == 'production') {
	const config = {
	client: process.env.CLIENT_PROD,
	connection: {
		host: process.env.HOST_PROD,
		user: process.env.USER_PROD,
		password: process.env.PASSWORD_PROD,
		database: process.env.DATABASE_PROD
		},
		pool: {min: 0, max: 7}
	}
	module.exports = config;
}
