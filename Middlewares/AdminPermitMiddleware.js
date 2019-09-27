const Admin = require('../Models/AdminModel')

const AdminsOnly = (req, res, next) => {

	Admin.forge({permit: })

}

module.exports = AdminsOnly;