// Import các module cần thiết
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Tạo ứng dụng Express
const app = express();

// Middleware để phân tích các yêu cầu JSON
app.use(bodyParser.json());

// Tạo một transporter
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'hodatdieuhanh@gmail.com', // Địa chỉ email của bạn
        pass: 'Hodatdieuhanh410@' // Mật khẩu của bạn
    }
});

// Route để xử lý yêu cầu POST gửi email
app.post('/send-email', (req, res) => {
    // Chuẩn bị nội dung email từ dữ liệu trong yêu cầu
    let mailOptions = {
        from: 'hodatdieuhanh@gmail.com', // Địa chỉ email của bạn
        to: req.body.recipient, // Địa chỉ email của người nhận được chuyển từ yêu cầu
        subject: 'Thông báo', // Tiêu đề email
        text: 'Nội dung thông báo của bạn' // Nội dung email
    };

    // Gửi email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send('Đã xảy ra lỗi khi gửi email3');
        } else {
            console.log('Email đã được gửi: ' + info.response);
            res.status(200).send('Email đã được gửi thành công!');
        }
    });
});


// Khởi động máy chủ và lắng nghe các yêu cầu trên cổng 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
