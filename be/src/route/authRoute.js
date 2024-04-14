//be\src\route\authRoute.js

const express = require("express");
const router = express.Router();
const AuthController = require("../app/controllers/AuthController.js");
const checkLogin = require("../app/middleware/checkLogin");

router.get("/", checkLogin, AuthController.fetchData);
router.post("/", (req, res, next) => {
    console.log("Received data:", req.body); // In ra dữ liệu nhận được từ client
    next(); // Chuyển tiếp yêu cầu tới controller
}, AuthController.login);

module.exports = router;
