const express = require("express");
const router = express.Router();
const TransactionController = require("../app/controllers/TransactionController.js");

router.get("/", TransactionController.getMyTransHistory);
router.get("/:slug", TransactionController.getTransactionBySlug);
router.post("/add", TransactionController.addNewTransaction);

module.exports = router;
