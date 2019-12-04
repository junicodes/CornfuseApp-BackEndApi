//This script page render the file to the sever.js file
const RouteUser = require('./UserRoutes')
const RouteUserContactUs = require('./UserContactUsRoutes')


//GR -> General Route Only
//AR -> Admin Route Only
//UR -> User Route Only

const render = (router, passport) => {
	//*****************************************************App Users Routes/Authentication
	const routeuser = new RouteUser(router, passport);

//->GR
	//Sign Up Users (post  method)
	routeuser.signUp('/sign_up');

	//Sign In Users (post  method)
	routeuser.signIn('/sign_in');

	//All Users (get  method)
	routeuser.showAll('/users');

	//Show one User (get method)
	routeuser.showCurrent('/user');

	//Show one User
	routeuser.showOne('/user/:id');

	//Delete user
	routeuser.delete('/user/delete');
//<-GR


	//*******************************************************Contact Us Routes
	const routecontactus = new RouteUserContactUs(router, passport);
//->GR
	//Create Contact-form (post method)
	routecontactus.create('/contact_us/create');
//<-GR

//->AU
	//View one Contact-form (get  method)
	routecontactus.showOne('/contact_us/show/:id');

	//View all (get  method)
	routecontactus.showAll('/contact_us/all');
	//****** End *****//
//->Au
}


exports.render = render;
