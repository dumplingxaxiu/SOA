const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

// Xử lý yêu cầu POST gửi email
router.post("/sendMail", async (req, res) => {
    const { email } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hodatdieuhanh@gmail.com', // Địa chỉ email của bạn
            pass: 'fibu kxcg erim ruao' // Sử dụng mật khẩu ứng dụng của bạn ở đây
        }
    });

    await transporter.sendMail(
        {
            from: 'hodatdieuhanh@gmail.com',
            to: `${email}`,
            subject: "hello_sb",
            text: "hello_text",
            html: "<b>Cậu ăn cơm chưa? :3</b>"
        },
        (err) => {
            if (err) {
                return res.json({
                    messager: "Loi",
                    err,
                });
            }
            return res.json({
                messager: `Đã gửi thành công đến ${email}`,
            });
        }
    );
});

module.exports = router;
