const Auth = require("./authRoute");
const Customer = require("./customerRoute");
const Transaction = require("./transactionRoute");
const SendMail = require("./sendMail"); // Import route sendMail
const AccessKeyValidate = require("../app/middleware/partnerKeyValidate");

const route = (app) => {
  app.use("/api/auth", AccessKeyValidate, Auth);
  app.use("/api/customer", AccessKeyValidate, Customer);
  app.use("/api/transaction", AccessKeyValidate, Transaction);
}

module.exports = route;
