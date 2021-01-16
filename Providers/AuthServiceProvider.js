//Import the User Model for Header Authorization
	const JwtStrategy = require('passport-jwt').Strategy;
	const ExtractJwt  = require('passport-jwt').ExtractJwt;
	const User = require('../Models/UserModel');

	const opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.SECRET_OR_KEY,
		passReqToCallback: true,
	};

	const strategy = new JwtStrategy(opts, (req, payload, next) => {	
		new User({id: payload.id}).fetch()
			.then(res => {
				//pass the user to the request to track user
				if (res) {
					req.user = res.attributes; // Store the user in session
					return next(null, res.attributes);
				} next(null, false);
			}).catch(err => {
				return next(err, false);
			})
	});
		   		
module.exports = strategy;
