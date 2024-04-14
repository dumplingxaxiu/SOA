//be\src\app\controllers\AuthController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Customer = require("../models/Customer");
const credentials = require("../../credentials");
const Role = require("../models/Role");

class AuthController {
  async fetchData(req, res, next) {
    try {
      // Lấy mã token từ header của yêu cầu
      const authHeader = req.headers['authorization'];

      // Kiểm tra xem tiêu đề Authorization có tồn tại không
      if (!authHeader) {
        return res.status(403).json({ success: false, message: 'Token is required!' });
      }

      // Tách phần mã token từ tiêu đề Authorization
      const token = authHeader.split(' ')[1];

      // Xác minh mã token
      jwt.verify(token, credentials.secret_key, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ success: false, message: 'Invalid token!' });
        } else {
          // Nếu mã token hợp lệ, lấy thông tin user và trả về kèm mã token
          const userID = decoded.data._id; // Sử dụng _id thay vì userID
          const me = await Customer.findOne({ _id: userID }).select("-password -citizenID");


          return res.json({
            success: true,
            message: "Get current user successfully!",
            user: me,
            token: token // Trả về lại mã token
          });
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }



  async login(req, res, next) {
    //Login handle
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.json({
        success: false,
        message: "Require username or password!",
        userName: userName,
        password: password
      });
    }
    try {
      const account = await Customer.findOne({ userName: userName });
      if (!account) {
        return res.json({
          success: false,
          message: "Username does not exist!",
        });
      }
      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch) {
        return res.json({
          success: false,
          message: "Username or password is incorrect!",
          userName: account.userName,
          password: account.password,
          isMatch: isMatch
        });
      }
      const payload = {
        data: account
      }
      const token = jwt.sign(payload, credentials.secret_key, {
        expiresIn: "12h",
      });
      return res.json({
        success: true,
        message: "Login successfully!",
        token: token,
        user: payload.data,
      });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }
}

module.exports = new AuthController();