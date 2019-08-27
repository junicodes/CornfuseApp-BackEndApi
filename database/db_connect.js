//Import mysql
const mysql = require('mysql');
// //Online connect to mysql 
// const connection = mysql.createConnection({
//     host: 'remotemysql.com',
//     user: 'zMHU3nfqP6',
//     password: 'peaQYOKvUS',
//     database: 'zMHU3nfqP6'
// });

//connect to mysql 
const conn = mysql.createConnection({
	host: 'localhost',
	user: 'junicodefire',
	password: '12345',
	database: 'cornfuseapp'
});

conn.connect((err) => {
	if (err) {
        console.log('There is an error'+err)
        return;
    };
	console.log('Connected!');
});
module.exports = conn;