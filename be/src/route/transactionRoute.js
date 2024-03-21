const express = require("express");
const router = express.Router();
const TransactionController = require("../app/controllers/TransactionController.js");

router.get("/history", TransactionController.getMyTransactionHistory);
router.post("/add", TransactionController.AddNewTransaction);

module.exports = router;
