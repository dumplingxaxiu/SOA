const express = require("express");
const router = express.Router();
const TuitionController = require("../app/controllers/TuitionController.js");
const checkLogin = require("../app/middleware/checkLogin.js");
const checkAdmin = require("../app/middleware/checkAdmin.js");

router.get("/",checkLogin, TuitionController.getMyTuition);
router.post("/add",checkLogin, checkAdmin, TuitionController.addNewTuition);
router.put("/update", checkLogin, checkAdmin, TuitionController.updateTuition)

module.exports = router;
