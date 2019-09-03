const dotenv = require('dotenv');
dotenv.config();
//import express engine
const express = require('express');
//Register our Express App
const app = new express();
//Require bodyParser
const bodyParser = require('body-parser')
//Import the path
const path = require('path')
//Template engine
const expressEgde = require('express-edge');

//Header AuthorizationProvider
const passport    = require('passport');
const jwt = require('jsonwebtoken');

const strategy = require('./Providers/AuthServiceProvider');

passport.use(strategy);
app.use(passport.initialize());
//Allow CrossOrigin
const allowCrosDomain = function(req, res, next) {
	res.header('Acess-Control-Allow-Origin', '*');
	next();
};
app.use(allowCrosDomain);
//Use the app Here(The USe function helps add functionality to express)
app.use(express.static('public'));
app.use(expressEgde);
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
//Set(Set specific value into our application) function for The template enginge\
app.set('views', `${ __dirname }/views`);

//Renders Api End Routes


//****** USER API ROUTES Directory@(RenderApi/UserRenderApi) *****//
const RouteUser = require('./RenderApi/UserRender')
const routeuser = new RouteUser(app, passport);
//Sign Up Users (post routes)
routeuser.signUp('/api/sign_up');
//Sign In Users (post routes)
routeuser.signIn('/api/sign_in');
//All Users (get routes)
routeuser.showAll('/api/users');
//Show one User
routeuser.showOne('/api/user');
//Show one User
// routeuser.showOne('/api/user/:id');
//Delete user
routeuser.delete('/api/user/delete');


//****** CONTACT US ROUTES Directory@(RenderApi/ContactUsRenderApi)*******//
const RouteContactUs = require('./RenderApi/ContactUsRender')
const routecontactus = new RouteContactUs(app, passport);
//Craate Contact-form (post routes)
routecontactus.create('/api/contact_us/create');
//View Contact-form (get routes)
routecontactus.showOne('/api/contact_us/show/:id');

routecontactus.showAll('/api/contact_us/show_all');




//****** END USER API ROUTES *****

//////////////////////---------End Local import---------///////////////////
app.get('/', (req, res) =>
{
    // res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    // res.render('index');
    res.status(200)
            .send('Cornfuse App Api...');
})

app.get('/about', (req, res) =>
{
    res.render('about');
    // res.sendFile(path.resolve(__dirname, 'pages/about.html'));

})
app.get('/post', (req, res) =>
{
    res.render('post');
    // res.sendFile(path.resolve(__dirname, 'pages/post.html'));

})
app.get('/contact', (req, res) =>
{
    res.render('contact')
    // res.sendFile(path.resolve(__dirname, 'pages/contact.html'));

})

























//Start the server
app.listen(7000, () =>
{
    console.log('Server running 7000')
});
