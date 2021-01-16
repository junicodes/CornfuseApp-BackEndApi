//import the database connection
const knex = require('knex')(require('../knexfile'))

const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('bookshelf-processor-plugin')


const ContactUs = bookshelf.model('Contact', {
	tableName: 'contact_us',
	hasTimestamps: true,
});

module.exports = ContactUs;