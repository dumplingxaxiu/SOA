async function checkAdmin(req, res, next) {
    let user = req.user;
    if(user.role != 0){
        return res.json({ success: false, message: "You don't have permission to access!" });
    }
    next();
}

module.exports = checkAdmin;