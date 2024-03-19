const jwt = require("jsonwebtoken");
const { secret_key } = require("../../credentials");
async function checkLogin(req, res, next) {
  let header = req.headers.authorization;
  let token = header && header.split(" ")[1];
  if (!token) {
    return res.json({ success: false, message: "Missing token!" });
  }
  try {
    let decoded = jwt.verify(token, secret_key);
    const user = decoded;
    if (user && user.is_verify) {
      req.user = user;
      next();
    } else {
      return res.json({ success: false, message: "User not login!" });
    }
  } catch (error) {
    return res.json({ success: false, message: "Error!" });
  }
}

module.exports = checkLogin;