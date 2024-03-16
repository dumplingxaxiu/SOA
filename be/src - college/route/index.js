const Auth = require("./authRoute");
const Customer = require("./customerRoute");
const Transaction = require("./transactionRoute")

function route(app) {
  app.use("/api/auth", Auth);
  app.use("/api/customer", Customer);
  app.use("/api/transaction", Transaction)
}
module.exports = route;
