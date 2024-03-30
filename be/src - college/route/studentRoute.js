const express = require("express");
const router = express.Router();
const StudentController = require("../app/controllers/StudentController.js");
const checkLogin = require('../app/middleware/checkLogin.js');
const checkAdmin = require('../app/middleware/checkAdmin.js');

router.get("/all",checkLogin, checkAdmin, StudentController.GetAllStudents);
router.post("/add", checkLogin, checkAdmin, StudentController.addNewStudent)
router.put("/update", checkLogin, checkAdmin, StudentController.updateStudent);
router.delete("/delete", checkLogin, checkAdmin, StudentController.deleteStudent);

module.exports = router;
