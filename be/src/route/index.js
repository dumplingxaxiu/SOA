// route/index.js

const Auth = require("./authRoute");
const Customer = require("./customerRoute");
const Transaction = require("./transactionRoute");
const SendMail = require("./sendMail"); // them route sendMail
const Invoice = require("./invoiceRoute");
const AccessKeyValidate = require("../app/middleware/partnerKeyValidate");

const route = (app) => {
  app.use("/api/auth", AccessKeyValidate, Auth);
  app.use("/api/customer", AccessKeyValidate, Customer);
  app.use("/api/transaction", AccessKeyValidate, Transaction);
  app.use("/api/sendMail", SendMail);
  app.use("/api/invoice", Invoice); // Thêm route mới cho gửi hóa đơn
}

module.exports = route;
