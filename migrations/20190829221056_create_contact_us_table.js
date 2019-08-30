
exports.up = function(knex) {
  return knex.schema.createTable('contact_us', (t) => {
  	t.increments('id').primary()
  	t.string('name').notNullable()
  	t.string('email').notNullable()
  	t.text('message').notNullable()
  	t.timestamps(false, true)
  })
};

exports.down = function(knex) {
  return knex.schema.droptableIfExists('contact_us')
};
