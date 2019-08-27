const conn = require('../database/db_connect')

class ConatactUsQuery  {

	showAll(values, req, res) {
		const query = 'SELECT * FROM ??';
		const sql = conn.format(query, values);
		conn.query(sql, (err, data, fields) => {
			if (err) {
				return res.status(401).json({
					message: 'An Error Occured while getting contact form',
					hint: err
				})
			}
			if (data) {
				return res.status(200).json({
					message: 'Successfull: All contact forms',
					results: data
				})
			}
		})
	}

	showOne(values, req, res) {
		const query = 'SELECT * FROM ?? WHERE ?? = ?';
		const sql = conn.format(query, values);
		conn.query(sql, (err, data, fields) => {
			if (err) {
				return res
				.status(401)
				.json({
					message: 'An Error Occured, please try again!',
					hint: err
				})
			}
			if (data) {
				return res
				.status(200)
				.json({
				    message: 'message Submited, thank you!',
					results: data
				})
			}
		});
	}

	create(req, res) {
		//insert Query
		const values = {
				name: req.body.name,
				email: req.body.email,
				message: req.body.message
			}

			conn.query('INSERT INTO contact_us SET ?', values, (err, data) => {
				if (err) {
					return res
					.status(401)
					.json({
						message: 'Error Submit message, please try again!',
						hint: err
					})
				}
				if (data) {
					const values = ['contact_us','id', data.insertId];
					this.showOne(values, req, res)
				}
			});
	}

}

module.exports = ConatactUsQuery;