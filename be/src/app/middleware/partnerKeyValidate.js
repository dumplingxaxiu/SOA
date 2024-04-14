//be\src\app\middleware\partnerKeyValidate.js
const credentials = require("../../credentials");

const AccessKeyValidate = async (req, res, next) => {
    const key = req.headers.key; // Lấy thông tin key từ tiêu đề của yêu cầu

    if (!key) {
        return res.json({
            success: false,
            message: "Missing information in access request through API"
        });
    }

    const hostname = "4000"; // Thay đổi giá trị hostname thành 4000

    const partner = credentials.partner[hostname];
    if (!partner) {
        return res.json({
            success: false,
            message: "Access request API is not available!"
        });
    }

    try {
        if (key !== partner) {
            return res.json({
                success: false,
                message: "Access key is invalid!"
            });
        } else {
            next();
        }
    } catch (error) {
        return res.json({
            success: false,
            message: "Error occurred in partner key validate! " + error.message
        });
    }
}

module.exports = AccessKeyValidate;
