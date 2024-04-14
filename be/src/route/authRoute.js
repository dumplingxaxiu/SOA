//be\src\route\authRoute.js
const express = require("express");
const router = express.Router();
const AuthController = require("../app/controllers/AuthController.js");
const checkLogin = require("../app/middleware/checkLogin");

router.get("/", checkLogin, AuthController.fetchData);
router.post("/", AuthController.login);


module.exports = router;
