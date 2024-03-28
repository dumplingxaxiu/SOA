const express = require("express");
const router = express.Router();
const TuitionController = require("../app/controllers/TuitionController.js");

router.get("/", TuitionController.getMyTuition);
//router.get("/:slug", TuitionController.getMyTuition);
//router.post("/add", TuitionController.addNewTransaction);

module.exports = router;
