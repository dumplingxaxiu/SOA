const express = require("express");
const router = express.Router();
const CustomerController = require("../app/controllers/CustomerController.js");
const checkLogin = require('../app/middleware/checkLogin');
const checkAdmin = require('../app/middleware/checkAdmin');

router.get("/", CustomerController.index);
router.get("/all", CustomerController.getCustomer);
router.post("/:slug", CustomerController.getCustomerBySlug);
router.post("/update", checkLogin, checkAdmin, CustomerController.updateCustomer);
router.post("/delete", checkLogin, checkAdmin, CustomerController.deleteCustomer);

module.exports = router;
