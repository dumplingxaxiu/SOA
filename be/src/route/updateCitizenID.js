// Import các thư viện cần thiết
const express = require('express');
const router = express.Router();
const User = require('../app/models/Customer');


// Định nghĩa route POST để cập nhật citizenID
router.post('/', async (req, res) => {
    const { _id, newCitizenID } = req.body;

    try {
        // Tìm người dùng theo userId
        const user = await User.findById(_id);
        console.log(_id + " " + newCitizenID);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng.' });
        }

        // Cập nhật citizenID của người dùng
        user.citizenID = newCitizenID;
        await user.save();

        return res.status(200).json({ success: true, message: 'Cập nhật citizenID thành công.' });
    } catch (error) {
        console.error('Error updating citizenID:', error);
        return res.status(500).json({ success: false, message: 'Lỗi khi cập nhật citizenID.' });
    }
});

module.exports = router;
