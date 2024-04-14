const credentials = require("../../credentials")

const AccessKeyValidate = async (req, res, next) => {
    const { key, hostname } = req.headers; // Sử dụng req.headers để lấy thông tin header

    if (!key || !hostname) {
        return res.json({
            success: false,
            message: "Missing information in access request through API"
        });
    }

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
