const express = require('express');
const router = express.Router();
const sendMail = require('../app/utils/sendEmail');
const credentials = require("../credentials");

// Xử lý yêu cầu POST gửi email
router.post("/", async (req, res) => {
    const { email } = req.body;

    await sendMail({
        from: credentials.email.emailAddress,
        to: `${email}`,
        subject: "hello_sb",
        text: "hello_text",
        html: "<b>Cậu ăn cơm chưa? :3</b>"
    }, (err, info) => {
        if (err) {
            return res.json({
                message: "Lỗi",
                error: err,
            });
        }
        return res.json({
            message: `Đã gửi thành công đến ${email}`,
            info: info
        });
    });
});

module.exports = router;
