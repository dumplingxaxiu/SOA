const express = require("express");
const router = express.Router();
const TransactionController = require("../app/controllers/TransactionController.js");
const checkLogin = require("../app/middleware/checkLogin.js");
const checkAdmin = require("../app/middleware/checkAdmin.js");

router.get("/history",checkLogin, TransactionController.getMyTransactionHistory);
router.post("/add",checkLogin, TransactionController.AddNewTransaction);

module.exports = router;
