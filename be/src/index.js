// index.js

const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

const route = require('./route/index.js');
const createAndSendInvoice = require('./invoiceFunctions'); // Thêm đường dẫn đến file mới

const db = require('./config/db.js');
const credentials = require('./credentials');
const init = require("./init");

db.connect();
init.createAdminAccount();

app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

route(app);

app.listen(PORT, async () => { // Sử dụng async function để gọi hàm tạo và gửi hóa đơn
    console.log(`App listening at http://localhost:${PORT}`);
    await createAndSendInvoice(); // Gọi hàm tạo và gửi hóa đơn khi server khởi động
});
