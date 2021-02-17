// //Import utill
// const util = require('util');
// //Import mysql
// const mysql = require('mysql');

// //Using Knex to create connection

// connect to mysql 
// const conn = mysql.createConnection({
//     host: 'localhost',
// 	user: 'junicodefire',
// 	password: '12345',
// 	database: 'cornfuseapp'
// });

// conn.connect((err) => {
// 	if (err) {
//         console.log('There is an error'+err)
//         return;
//     };
// 	console.log('Connected!');
// });
// conn.query = util.promisify(conn.query);
// module.exports = conn;

// // const connection = mysql.createConnection({
// //     host: 'remotemysql.com',
// //     user: 'zMHU3nfqP6',
// //     password: 'peaQYOKvUS',
// //     database: 'zMHU3nfqP6'
// // });
