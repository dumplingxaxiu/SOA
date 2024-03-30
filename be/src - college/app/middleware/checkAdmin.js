const Role = require("../models/Role");

async function checkAdmin(req, res, next) {
    let role = await Role.findOne({studentID: req.user.data.studentID})
    
    if(role.role != 0){
        return res.json({ success: false, message: "You don't have permission to access!" });
    }
    next();
}

module.exports = checkAdmin;