//Import the User Model for Header Authorization
	const JwtStrategy = require('passport-jwt').Strategy;
	const ExtractJwt  = require('passport-jwt').ExtractJwt;
	const User = require('../Model/UserModel');

	const opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.SECRET_OR_KEY,
		passReqToCallback: true,
	};
	const strategy = new JwtStrategy(opts, (req, payload, next) => {	
		User.forge({id: payload.id}).fetch()
		.then(res => {
			//pass the user to the request to track user
			if (res) {
			   req.user = res; // Store the user 
			   next(null, res);
			}else{
				next(null, false);
			}
		})
	});

module.exports = strategy;

