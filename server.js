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
app.use(bodyParser.urlencoded({ extended: true }));

//Set(Set specific value into our application) function for The template enginge\
app.set('views', `${ __dirname }/views`);

//////////////////////---------Local import---------///////////////////

//Import the store.js
const store = require('./store');

//Renders Api End Routes

//****** USER API ROUTES Directory@(RenderApi/UserRenderApi) *****//
const User = require('./RenderApi/UserRender')
const user = new User(app);
//Sign Up Users (post routes)
user.routeCreate('/api/user/create');
//All Users (get routes)
user.routeShowAll('/api/users');
//Show one User
user.routeShowOne('/api/user/:id');
//Delete user
user.routeDelete('/api/user/delete/:id');

//****** CONTACT US ROUTES Directory@(RenderApi/ContactUsRenderApi)*******//
const ContactUs = require('./RenderApi/ContactUsRender')
const contactus = new ContactUs(app);
//Craate Contact-form (post routes)
contactus.routeCreate('/api/contact_us/create');
//View Contact-form (get routes)
contactus.routeShowOne('/api/contact_us/show/:id');

contactus.routeShowAll('/api/contact_us/show_all');




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
    console.log('Server running on http://localhost:7000')
});
