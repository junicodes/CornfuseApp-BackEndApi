const User = require('../Models/UserModel');
const {userRole} = require('../configs/config.js');

const AdminsOnly = (req, res, next) => {
	if(req.user.role !== userRole.admin.role
	 && req.user.type !== userRole.admin.type) {
		return res.status(403).json({
			status: false,
			message: 'You are not permiited to access this route.',
			hint: 'Please authenticate with permitted login data, or contact admin support.'
		})
	}
	next();
}

module.exports = AdminsOnly;