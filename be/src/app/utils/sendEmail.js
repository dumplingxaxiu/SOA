const transporter = require("../../config/mail");

const sendMail = async (mailDetails, callback) => {
  try {
    const info = await transporter.sendMail(mailDetails);
    callback(null, info); // Truyền null nếu không có lỗi
  } catch (error) {
    console.log(error);
    callback(error, null); // Truyền lỗi nếu có lỗi xảy ra
  }
};

module.exports = sendMail;
