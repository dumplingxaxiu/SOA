const Auth = require("./authRoute");

function route(app) {
  app.use("/api/auth", Auth);
}
module.exports = route;
