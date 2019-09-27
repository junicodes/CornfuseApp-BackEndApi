
exports.up = function(knex) {
  return knex.schema.createTable('admins', (t) => {
  	t.increments('id').unsigned().primary()
  	t.string('username').unique().notNullable()
  	t.string('email').unique().notNullable()
  	t.string('password_digest').notNullable()
  	t.string('firstname').nullable()
  	t.string('lastname').nullable()
  	t.string('image').default('no-image.png')
    t.string('role').defaultTo(config.userRole.admin)
  	t.string('ip').nullable()
  	t.string('loaction').nullable()
  	t.timestamps(false, true)
  })
};

exports.down = function(knex) {
  return knex.schema.droptableIfExist('admins')
};
