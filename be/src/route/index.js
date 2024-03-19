const Auth = require("./authRoute");
const Customer = require("./customerRoute");

const route = (app) => {
  app.use("/api/auth", Auth);
  app.use("/api/customer", Customer);
  
}
module.exports = route;
