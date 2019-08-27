//[
//Import express module
//import express engine
const express = require('express')
//Require bodyParser
const bodyParser = require('body-parser')
//Import the path
const path = require('path')
//Template engine
const expressEgde = require('express-edge');
//]

//Register our Express App
const app = new express();

//Use the app Here(The USe function helps add functionality to express)
app.use(express.static('public'));
app.use(expressEgde);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set(Set specific value into our application) function for The template enginge\
app.set('views', `${ __dirname }/views`);

//////////////////////---------Local import---------///////////////////

//Import the store.js
const store = require('./store');

//Renders Api End Routes

//****** USER API ROUTES *****//
const UserApi = require('./RenderApi/UserRender')
const userapi = new UserApi(app);
//Get All Users Routes
userapi.getAll('/api/users');

//****** CONTACT US ROUTES*******//
const ContactUsApi = require('./RenderApi/ContactUsRender')
const contactus = new ContactUsApi(app);
contactus.create('/api/contact_us/create');
contactus.showOne('/api/contact_us/show/:id');
contactus.showAll('/api/contact_us/show_all');




//****** END USER API ROUTES *****

//////////////////////---------End Local import---------///////////////////
//Register the Route
app.get('/', (req, res) =>
{
    // res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    res.render('index');
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
    console.log('Server running on http://localhost:7500')
});
