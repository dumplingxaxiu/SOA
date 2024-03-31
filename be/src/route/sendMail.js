//../src/route/sendMail.js

const express = require('express');
const router = express.Router();
const { OTPSigned } = require('../app/utils/otpUtils');

// Xử lý yêu cầu POST để gửi mã OTP qua email
router.post("/", async (req, res) => {
    const { email } = req.body;

    try {
        const otpInfo = await OTPSigned(email);
        res.json({
            message: `Đã gửi mã OTP thành công đến ${email}`,
            otpInfo: otpInfo
        });
    } catch (error) {
        console.log("Error sending OTP:", error);
        res.status(500).json({ message: "Lỗi khi gửi mã OTP" });
    }
});

module.exports = router;

