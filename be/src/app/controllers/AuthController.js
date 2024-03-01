const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Account = require("../models/Account");
const credentials = require("../../credentials");

class AuthController {
  async fetchData(req, res, next) {
    let email = req.user.username;
    let role = req.user.role;
    try {
      let me = req.user
      if(role == "admin"){
        
      }else {
        me = await Account.findOne({ username: username }).select("-password");
      }

      return res.json({
        success: true,
        message: "Login successfully!",
        user: me,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async login(req, res, next) {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.json({
        success: false,
        message: "Require username or password!",
      });
    }
    try {
      //const account = await Account.findOne({ username: username });
      if (!username == "admin") {
        return res.json({
          success: false,
          message: "Username or password is incorrect!",
        });
      }
      //const isMatch = await bcrypt.compare(password, account.password);
      if (!password == "admin") {
        return res.json({
          success: false,
          message: "Username or password is incorrect!",
        });
      }
      const payload = {
        id: "1",
        username: username,
        password: password,
        role: "admin"
      };
      console.log(payload)
      const userInfo = {
        name: username,
        role: payload.role
      };
      const token = jwt.sign(payload, credentials.secret_key, {
        expiresIn: "12h",
      });
      return res.json({
        success: true,
        message: "Login successfully!",
        token: token,
        user: userInfo,
      });
    } catch (error) {
      return res.json({ success: false, message: "Error!" });
    }
  }

  async register(req, res, next) {
    const { username, password, confirm_password } = req.body;
    if (!username || !password || !confirm_password) {
      return res.json({
        success: false,
        message: "Missing email or password or confirm password!",
      });
    }
    if (password !== confirm_password) {
      return res.json({
        success: false,
        message: "Password and confirm password is not match!",
      });
    }

    try {
      const account = await Account.findOne({ username: username });
      if (account) {
        return res.json({ success: false, message: "Username is already exist!" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newAccount = new Account({
        email: email,
        password: hashPassword,
        role: "customer",
      });
      await newAccount.save();
      return res.json({ success: true, message: "Register successfully!" });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Error!" });
    }
  }

  async verifyOTP(req, res, next) {
    const { otp, email } = req.body;
    if (!otp || !email) {
      return res.json({ success: false, message: "Missing otp or email!" });
    }
    try {
      const verifyEmail = await VerifyEmail.findOne({ email: email });
      if (!verifyEmail) {
        return res.json({ success: false, message: "OTP is expired!" });
      }
      if (verifyEmail.otp !== otp) {
        return res.json({ success: false, message: "OTP is incorrect!" });
      }
      await Account.findOneAndUpdate({ email: email }, { is_verify: true });
      await VerifyEmail.findByIdAndRemove(verifyEmail._id);
      const account = await Account.findOne({ email: email });
      const payload = {
        id: account._id,
        email: account.email,
        password: account.password,
        role: account.role,
        is_verify: account.is_verify,
        date_of_birth: account.date_of_birth,
        address: account.address,
        phone: account.phone,
      };
      const userInfo = {
        name: account.name,
        email: account.email,
        date_of_birth: account.date_of_birth,
        role: account.role,
        address: account.address,
        phone: account.phone,
        is_verify: account.is_verify,
      };
      const token = jwt.sign(payload, credentials.secret_key, {
        expiresIn: "12h",
      });
      return res.json({
        success: true,
        message: "Verify successfully!",
        token: token,
        user: userInfo,
      });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Error!" });
    }
  }

  async updateUserData(req, res, next) {
    const { name, date_of_birth, address, phone } = req.body;
    if (!name || !date_of_birth || !address || !phone) {
      return res.json({
        success: false,
        message: "Missing name or date of birth or address or phone!",
      });
    }
    try {
      const account = await Account.findOneAndUpdate(
        { email: req.user.email },
        { name: name, date_of_birth: date_of_birth, address: address, phone: phone },
        { new: true }
      );
      return res.json({ success: true, message: "Update successfully!", user: account });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Error!" });
    }
  }
}

function generateNumberToken(lenght = 6) {
  let number = "";
  for (let i = 0; i < lenght; i++) {
    number += Math.floor(Math.random() * 10);
  }
  return number;
}

module.exports = new AuthController();
