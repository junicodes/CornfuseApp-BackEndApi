//import the database connection

const knex = require('knex')(require('../knexfile'))
const bookshelf = require('bookshelf')(knex);
const securePassword = require('bookshelf-secure-password')
bookshelf.plugin('bookshelf-processor-plugin')
bookshelf.plugin(securePassword)

// Defining models
const User = bookshelf.model('User', {
	tableName: 'users',
	hidden: ['password_digest', 'third_party_auth_id', 'type', 'role'],
	hasTimestamps: true,
	hasSecurePassword: true,
});

module.exports = User;