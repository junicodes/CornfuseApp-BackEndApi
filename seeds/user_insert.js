const config = require('../configs/config.js')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
          {
            id: 1,
            username: 'game_admin',
            email: 'admin@cornfusetech.com',
            password_digest: `$2b$12$RzIEflL/ZuNwwvwWzW3R0uDZpcfuu4QLwRJ6ZVnUv5lQ0PyR6ZUTK`,
            role: config.userRole.admin.type,
            role: config.userRole.admin.role
          },
          {
            id: 2,
            username: 'gameboy',
            email: 'gameboy@cornfusetech.com',
            password_digest: `$2b$12$RzIEflL/ZuNwwvwWzW3R0uDZpcfuu4QLwRJ6ZVnUv5lQ0PyR6ZUTK`,
            role: config.userRole.user.type,
            role: config.userRole.user.role
          },
          {
            id: 3,
            username: 'babybite',
            email: 'babybite@cornfusetech.com',
            password_digest: `$2b$12$RzIEflL/ZuNwwvwWzW3R0uDZpcfuu4QLwRJ6ZVnUv5lQ0PyR6ZUTK`,
            role: config.userRole.user.type,
            role: config.userRole.user.role
          },
          {
            id: 4,
            username: 'twister',
            email: 'twister@cornfusetech.com',
            password_digest: `$2b$12$RzIEflL/ZuNwwvwWzW3R0uDZpcfuu4QLwRJ6ZVnUv5lQ0PyR6ZUTK`,
            role: config.userRole.user.type,
            role: config.userRole.user.role
          }
      ]);
    });
};
