const Role = require("../models/Role");

async function checkAdmin(req, res, next) {
    let user = req.user.data;
    let userRole = await Role.findOne({userID: user.userID})
    console.log(userRole)
    if(userRole.role != 0){
        return res.json({ success: false, message: "You don't have permission to access!" });
    }
    next();
}

module.exports = checkAdmin;