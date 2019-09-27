//import the database connection
const knex = require('knex')(require('../knexfile'))

const bookshelf = require('bookshelf');
const db = bookshelf(knex);
db.plugin('visibility');

const ContactUs = db.Model.extend({
	tableName: 'contact_us',
});

module.exports = ContactUs;