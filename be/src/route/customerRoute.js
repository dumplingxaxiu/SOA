const express = require("express");
const router = express.Router();
const CustomerController = require("../app/controllers/CustomerController.js");
const checkLogin = require('../app/middleware/checkLogin');
const checkAdmin = require('../app/middleware/checkAdmin');

router.get("/all", CustomerController.GetAllCustomers);
router.get("/profile", CustomerController.getCurrentCustomer);
router.post("/add", checkLogin,checkAdmin, CustomerController.AddNewCustomer)
router.post("/update", checkLogin, checkAdmin, CustomerController.UpdateCustomer);
router.post("/delete", checkLogin, checkAdmin, CustomerController.DeleteCustomer);

module.exports = router;
