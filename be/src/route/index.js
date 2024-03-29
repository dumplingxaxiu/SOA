const Auth = require("./authRoute");
const Customer = require("./customerRoute");
const Transaction = require("./transactionRoute");
const SendMail = require("./sendMail"); // Import route sendMail

const route = (app) => {
  app.use("/api/auth", Auth);
  app.use("/api/customer", Customer);
  app.use("/api/transaction", Transaction);
  app.use("/", SendMail); // Sử dụng route sendMail
}

module.exports = route;
