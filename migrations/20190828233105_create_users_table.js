const config = require('../configs/config.js')

exports.up = function(knex) {
  return knex.schema.createTable('users', (t) => {
  	t.increments('id').unsigned().primary()
  	t.string('username').unique().notNullable().default('admin')
  	t.string('email').unique().notNullable().default('admin@cornfuseapp.com')
  	t.string('password_digest').notNullable()
  	t.string('firstname').nullable()
  	t.string('lastname').nullable()
  	t.string('image').default('cornfuse-default.png')
  	t.string('status').default('You status helps clarify your personality!')
  	t.string('ip').nullable()
  	t.string('location').nullable()
    t.string('third_party_auth_id').nullable()
    t.string('type').defaultTo(config.userRole.user.type)
    t.boolean('role').defaultTo(config.userRole.user.role)
  	t.timestamps(false, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
