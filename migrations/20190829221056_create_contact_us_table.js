const config = require('../configs/config.js')

exports.up = function(knex) {
  return knex.schema.createTable('contact_us', (t) => {
  	t.increments('id').unsigned().primary()
  	t.string('name').notNullable()
  	t.string('email').notNullable()
  	t.text('message').notNullable()
  	t.string('third_party_auth_id').nullable()
    t.string('type').defaultTo(config.userRole.guest.type)
    t.boolean('role').defaultTo(config.userRole.guest.role)
  	t.timestamps(false, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('contact_us')
};
