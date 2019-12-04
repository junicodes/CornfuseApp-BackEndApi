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
//Import CORS
const cors = require('cors');
//Declare Express router
const router = express.Router();
//Header AuthorizationProvider
const passport = require('passport');
const jwt = require('jsonwebtoken');

const strategy = require('./Providers/AuthServiceProvider');

    passport.use(strategy); 
    app.use(passport.initialize());


//Use cors
app.use(cors());
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
//Use api prefix for the apis
app.use('/api', router);

//API ROUTES Render 
const routeRender = require('./Routes/render');
routeRender.render(router, passport);



































// //****** END USER API ROUTES *****

// //////////////////////---------End Local import---------///////////////////
// app.get('/', (req, res) =>
// {
//     // res.sendFile(path.resolve(__dirname, 'pages/index.html'))
//     // res.render('index');
//     res.status(200)
//             .send('Cornfuse App Api...');
// })

// app.get('/about', (req, res) =>
// {
//     res.render('about');
//     // res.sendFile(path.resolve(__dirname, 'pages/about.html'));

// })
// app.get('/post', (req, res) =>
// {
//     res.render('post');
//     // res.sendFile(path.resolve(__dirname, 'pages/post.html'));

// })
// app.get('/contact', (req, res) =>
// {
//     res.render('contact')
//     // res.sendFile(path.resolve(__dirname, 'pages/contact.html'));

// })

























//Start the server
app.listen(process.env.PORT || 8000, () =>
{
    console.log('Server running 8000')
});
