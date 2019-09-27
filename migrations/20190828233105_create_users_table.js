
exports.up = function(knex) {
  return knex.schema.createTable('users', (t) => {
  	t.increments('id').unsigned().primary()
  	t.string('username').unique().notNullable()
  	t.string('email').unique().notNullable()
  	t.string('password_digest').notNullable()
  	t.string('firstname').nullable()
  	t.string('lastname').nullable()
  	t.string('image').default('no-image.png')
  	t.string('status').default('You status helps clarify your personality!')
  	t.string('ip').nullable()
  	t.string('location').nullable()
    t.string('role').defaultTo(config.userRole.user)
  	t.timestamps(false, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
