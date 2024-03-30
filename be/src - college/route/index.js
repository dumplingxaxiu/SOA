const Auth = require("./authRoute");
const Student = require("./studentRoute");
const Tuition = require("./tuitionRoute")

function route(app) {
  app.use("/api/auth", Auth);
  app.use("/api/student", Student);
  app.use("/api/tuition", Tuition)
}
module.exports = route;
