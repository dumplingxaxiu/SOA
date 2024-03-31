//../app/utils/otpUtils
const { json } = require("express");
const bcrypt = require("bcrypt");

const sendMail = require("../utils/sendEmail"); // Import hàm gửi email từ tệp sendEmail.js
const credentials = require("../../credentials"); // Import tệp chứa thông tin về email và password

const today = new Date();
var DD = today.getDate()
var MM = today.getMonth() + 1
var YYYY = today.getFullYear();
var hh = today.getHours()
var mm = today.getMinutes()
var ss = today.getSeconds()

const OTPGenerator = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

// Hàm gửi mã OTP qua email
const OTPSigned = async (email) => {
    let otp = OTPGenerator();
    console.log(otp);

    // Tạo thời gian hết hạn của mã OTP
    let expiredAt = new Date();
    expiredAt.setMinutes(expiredAt.getMinutes() + 3); // Thêm 3 phút

    // Tạo nội dung email với thông báo thời gian hết hạn của mã OTP
    const options = {
        from: credentials.email.emailAddress,
        to: email,
        subject: "Transaction OTP for confirmation",
        text: `Mã OTP giao dịch của bạn là ${otp}. Mã OTP này sẽ hết hạn vào lúc ${expiredAt.toLocaleString()}` // Thêm thông báo thời gian hết hạn vào nội dung email
    }

    // Gửi email và xử lý kết quả
    await sendMail(options, (err, info) => {
        if (err) {
            console.log("Error sending OTP email:", err);
        } else {
            console.log("OTP email sent successfully:", info);
        }
    });

    // Hash mã OTP và trả về mã đã hash cùng với thời gian hết hạn
    let hashedOTP = bcrypt.hashSync(otp, 10);
    return {
        otp: hashedOTP,
        expiredAt: expiredAt
    }
}


const OTPVerify = async (key, otp) => {
    console.log(key)
    if (!key) {
        return {
            success: false,
            message: "Cannot get session"
        }
    }
    if (!key.transactionID) {
        return {
            success: false,
            message: "transaction otp verify failed by id"
        }
    }
    const verifyTime = new Date()
    if (verifyTime <= key.otp.expiredAt) {
        return {
            success: false,
            message: "transaction otp verify failed by expiration"
        }
    }
    const isMatch = await bcrypt.compare(otp, key.otp.otp)
    console.log(isMatch)
    if (!isMatch) {
        return {
            success: false,
            message: "transaction otp verify failed by otp"
        }
    } else {
        return {
            success: true,
            message: "transaction verified"
        }
    }
}
module.exports = { OTPSigned, OTPVerify }