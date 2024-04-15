//be\src\route\index.js

const bodyParser = require("body-parser");
const Auth = require("./authRoute");
const Customer = require("./customerRoute");
const Transaction = require("./transactionRoute");
const SendMail = require("./sendMail"); // them route sendMail
const Invoice = require("./invoiceRoute");
const AccessKeyValidate = require("../app/middleware/partnerKeyValidate");
const AuthController = require('../app/controllers/AuthController');
const tutionRoute = require('../route/tutionRoute');
const UpdateCitizenID = require("../route/updateCitizenID"); // Import route mới
const TransactionHistory = require('../route/TransactionHistory_route');

const route = (app) => {
  app.use(bodyParser.json());
  app.use("/api/auth", AccessKeyValidate, Auth);
  app.use("/api/customer", AccessKeyValidate, Customer);
  app.use("/api/transaction", AccessKeyValidate, Transaction);
  app.use("/api/sendMail", SendMail);
  app.use("/api/invoice", Invoice); // Thêm route mới cho gửi hóa đơn
  app.use("/api/login", (req, res, next) => {
    // Lấy thông tin username và password từ request body
    const { userName, password } = req.body;

    // In ra console để kiểm tra dữ liệu nhận được từ client
    console.log("Username from client:", userName);
    console.log("Password from client:", password);

    // Tiếp tục xử lý yêu cầu bằng cách chuyển gọi middleware Auth
    Auth(req, res, next);
  });
  app.get("/api/fetchData", AuthController.fetchData);
  app.use("/api/tutions", tutionRoute);
  app.use("/api/updateCitizenID", UpdateCitizenID); // Sử dụng route mới
  app.use("/api/invoice", Invoice);
  app.use("/api/fetchtranhistory", TransactionHistory);
}

module.exports = route;
