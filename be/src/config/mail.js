//config/mail.js
const nodemailer = require("nodemailer");
const CREDENTAILS = require("../credentials")

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: CREDENTAILS.email.emailAddress,
    pass: CREDENTAILS.email.password,
  },
});

module.exports = transporter