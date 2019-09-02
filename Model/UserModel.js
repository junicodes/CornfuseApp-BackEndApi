//import the database connection
const knex = require('knex')(require('../knexfile'))

const bookshelf = require('bookshelf');
const securePassword = require('bookshelf-secure-password');
const db = bookshelf(knex);
db.plugin(securePassword);
db.plugin('visibility');

const User = db.Model.extend({
	tableName: 'users',
	hidden: ['password_digest'],
	hasSecurePassword: true
});

module.exports = User;