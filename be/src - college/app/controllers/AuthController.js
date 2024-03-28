const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Student = require("../models/Student");
const credentials = require("../../credentials");

class AuthController {
  async fetchData(req, res, next) {
    //Lấy data của user hiện tại
    let userID = req.user.userID;
    try {
      me = await Student.findOne({ userID: userID }).select("-password");

      return res.json({
        success: true,
        message: "Get current user successfully!",
        user: me,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async login(req, res, next) {
    //Login handle
    const { studentID, password } = req.body;
    
    if (!studentID || !password) {
      return res.json({
        success: false,
        message: "Require username or password!",
      });
    }
    try {
      const account = await Student.findOne({ studentID: studentID });
      if (!account) {
        return res.json({
          success: false,
          message: "Student ID does not exist!",
        });
      }
      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch) {
        return res.json({
          success: false,
          message: "Student ID or password is incorrect!",
        });
      }
      const payload = {
        data: account
      }
      console.log(payload)
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
      return res.json({ success: false, message: "Error in auth login!" });
    }
  }
}
module.exports = new AuthController();
