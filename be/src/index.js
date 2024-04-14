//be\src\index.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const db = require('./config/db.js');
const credentials = require('./credentials');
const init = require("./init");
const route = require('./route/index.js');
const createAndSendInvoice = require('./invoiceFunctions');

const app = express();
const PORT = process.env.PORT || 4000;
console.log('Routes initialized successfully');
// Kết nối cơ sở dữ liệu và tạo tài khoản quản trị khi máy chủ khởi động
db.connect();
init.createAdminAccount();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views'))); // Kết nối các tệp tĩnh từ thư mục public
// Định tuyến
route(app);

// Cấu hình sử dụng EJS làm template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
    res.render('Customer/SignIn'); // Tên của tệp EJS là SignIn.ejs
});

app.get('/homepage', (req, res) => {
    res.render('Customer/HomePage'); // Tên của tệp EJS là HomePage.ejs
});

app.get('/homepage/profileuser', (req, res) => {
    res.render('Customer/ProfileUser'); // Tên của tệp EJS là ProfileUser.ejs
});

app.get('/homepage/announcementpage', (req, res) => {
    res.render('Customer/AnnouncementPage'); // Tên của tệp EJS là AnnouncementPage.ejs
});

app.get('/homepage/paymentoftuitionfees', (req, res) => {
    res.render('Transaction/PaymentOfTuitionFees'); // Tên của tệp EJS là PaymentOfTuitionFees.ejs
});

app.get('/homepage/transactionhistory', (req, res) => {
    res.render('Transaction/TransactionHistory'); // Tên của tệp EJS là TransactionHistory.ejs
});

app.get('/homepage/paymentoftuitionfees/otpconfirmationpage', (req, res) => {
    res.render('Transaction/OTPConfirmationPage'); // Tên của tệp EJS là OTPConfirmationPage.ejs
});

app.get('/homepage/paymentoftuitionfees/otpconfirmationpage/transactionresultpage', (req, res) => {
    res.render('Transaction/TransactionResultPage'); // Tên của tệp EJS là TransactionResultPage.ejs
});

app.get('/homepage/paymentoftuitionfees/paymentinformationpage', (req, res) => {
    res.render('Transaction/PaymentInformationPage'); // Tên của tệp EJS là PaymentInformationPage.ejs
});

// Lắng nghe cổng
app.listen(PORT, async () => {
    console.log(`App listening at http://localhost:${PORT}`);
    // Gọi hàm tạo và gửi hóa đơn khi server khởi động
    await createAndSendInvoice();
});
