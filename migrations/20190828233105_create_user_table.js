
exports.up = function(knex) {
  return knex.schema.createTable('users', (t) => {
  	t.increments('id').primary()
  	t.string('username').unique().notNullable()
  	t.string('email').unique().notNullable()
  	t.string('password').notNullable()
  	t.string('firstname').nullable()
  	t.string('lastname').nullable()
  	t.string('image').nullable()
  	t.string('status').default('You status helps clarify your personality!')
  	t.string('ip').nullable()
  	t.string('location').nullable()
  	t.timestamps(false, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
