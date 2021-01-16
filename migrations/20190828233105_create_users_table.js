const {userRole} = require('../configs/config.js')

exports.up = function(knex) {
  return knex.schema.createTable('users', (t) => {
  	t.increments('id').unsigned().primary()
  	t.string('username').unique().notNullable().default('admin')
  	t.string('email').unique().notNullable().default('admin@cornfuseapp.com')
  	t.string('password_digest').notNullable()
  	t.string('firstname').nullable()
  	t.string('lastname').nullable()
  	t.string('profile_photo_url').default('https://ui-avatars.com/api/?name=victore+Mark&color=7F9CF5&background=EBF4FF')
  	t.string('status').default('You status helps clarify your personality!')
  	t.string('ip').nullable()
  	t.string('location').nullable()
    t.string('third_party_auth_id').nullable()
    t.string('type').defaultTo(userRole.user.type)
    t.integer('role').defaultTo(userRole.user.role)
  	t.timestamps(false, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
