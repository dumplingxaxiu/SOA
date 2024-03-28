const express = require("express");
const router = express.Router();
const AuthController = require("../app/controllers/AuthController.js");
const checkLogin = require("../app/middleware/checkLogin");

router.get("/", checkLogin, AuthController.fetchData);
router.post("/login", AuthController.login);

module.exports = router;
