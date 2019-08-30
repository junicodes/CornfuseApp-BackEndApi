const knex = require('knex')(require('../knexfile'))

class ConatactUsQuery  {

	showAll(res) {
		knex('contact_us').select('*')
		.then(rows => {
			return res
			.status(200)
			.json({
				success: true,
				message: "Contact form messages",
				results: rows
			})
		})
		.catch(err => {
			return res
			.status(500)
			.json({
				error: true,
				message: "An Error Occured!, please try again"
			})
		})
	}

	showOne(id, key, req, res) {

		knex('contact_us').where('id', id)
		.then(rows => {
			
			if (key == 0) {
				return res.status(201)
				.json({
					success: true,
					message: "Successfull Submitted, thank you!",
					results: rows
				})
			}else {
				return res.status(200)
				.json({
					success: true,
					message: 'Current message for contact form',
					results: rows
				})
			}
		})
		.catch(err => {
			return res.status(500)
			.json({
			    error: true,
				message: 'An error occured, please try again',
				hint: err
			})
		})
	}

	create(req, res) {
		//insert Query
		const values = {
				name: req.body.name,
				email: req.body.email,
				message: req.body.message
			}
			knex('contact_us')
			.insert(values)
			.then(rows => {
				if (rows) {
					const key = 0;
					this.showOne(rows[0], key, req, res);
				}
			})
			.catch(err => {
				return res.status(500)
				.json({
					error: true,
					message: 'An error Occured, please try again'
				})
			})
	}

}

module.exports = ConatactUsQuery;




// class ConatactUsQuery  {

// 	showAll(values, req, res) {
// 		const query = 'SELECT * FROM ??';
// 		const sql = conn.format(query, values);
// 		conn.query(sql, (err, data, fields) => {
// 			if (err) {
// 				return res.status(401).json({
// 					message: 'An Error Occured while getting contact form',
// 					hint: err
// 				})
// 			}
// 			if (data) {
// 				return res.status(200).json({
// 					message: 'Successfull: All contact forms',
// 					results: data
// 				})
// 			}
// 		})
// 	}

// 	showOne(values, req, res) {
// 		const query = 'SELECT * FROM ?? WHERE ?? = ?';
// 		const sql = conn.format(query, values);
// 		conn.query(sql, (err, data, fields) => {
// 			if (err) {
// 				return res
// 				.status(401)
// 				.json({
// 					message: 'An Error Occured, please try again!',
// 					hint: err
// 				})
// 			}
// 			if (data) {
// 				return res
// 				.status(200)
// 				.json({
// 				    message: 'message Submited, thank you!',
// 					results: data
// 				})
// 			}
// 		});
// 	}

// 	create(req, res) {
// 		//insert Query
// 		const values = {
// 				name: req.body.name,
// 				email: req.body.email,
// 				message: req.body.message
// 			}

// 			conn.query('INSERT INTO contact_us SET ?', values, (err, data) => {
// 				if (err) {
// 					return res
// 					.status(401)
// 					.json({
// 						message: 'Error Submit message, please try again!',
// 						hint: err
// 					})
// 				}
// 				if (data) {
// 					const values = ['contact_us','id', data.insertId];
// 					this.showOne(values, req, res)
// 				}
// 			});
// 	}

// }

// module.exports = ConatactUsQuery;