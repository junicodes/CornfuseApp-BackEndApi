//import Knex ORM and the database connection
const knex = require('knex')(require('../knexfile'))
//import BookShelf
const bookshelf = require('bookshelf');
const securePassword = require('bookshelf-secure-password')
const db = bookshelf(knex);
db.plugin(securePassword);
db.plugin('visibility');

const Admin = db.Model.extend({
	tableName: 'admins',
	hidden: ['password_digest'],
	hasSecurePassword: true
})

module.exports = Admin;
