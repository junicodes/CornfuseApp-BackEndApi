//This script page render the file to the sever.js file
const UserController = require('../Controllers/UserController');

const RegisterValidate = require('../Validation/RegisterValidate');
const LoginValidate = require('../Validation/LoginValidate');
const AdminOnly = require('../Middlewares/AdminOnlyMiddleware');


const render = async (Route, passport) => {

	const auth = await passport.authenticate('jwt', {session: false}); //App Authorization 

	Route.get('/', (req, res) => {
		res.status(200).send('Cornfuse App Api, Please as the prefix api/v1 to all api route...');
	});

	Route.post('/sign-up', RegisterValidate, UserController.create);

	Route.post('/sign-in', LoginValidate, UserController.signIn);

	Route.get('/user', auth, UserController.showCurrent);
	
	Route.get('/user/:id', auth, UserController.showOne);

	Route.get('/users/:page', auth, AdminOnly, UserController.showAll); //Admin Only

	Route.delete('/user/delete', auth, UserController.destroyCurrent);

	Route.delete('/user/delete/:id', auth, AdminOnly, UserController.destroyOther); //Admin Only

}

module.exports = render;

