
exports.up = function(knex) {
  return knex.schema.createTable('contact_us', (t) => {
  	t.increments('id').unsigned().primary()
  	t.string('name').notNullable()
  	t.string('email').notNullable()
  	t.text('message').notNullable()
  	t.string('role').defaultTo(config.userRole.guest)
  	t.timestamps(false, true)
  })
};

exports.down = function(knex) {
  return knex.schema.droptableIfExists('contact_us')
};
