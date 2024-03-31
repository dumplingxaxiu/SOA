// route/invoiceRoute.js
const express = require('express');
const router = express.Router();
const generateInvoicePDF = require('../app/utils/generateInvoicePDF');
const sendInvoiceEmail = require('../app/utils/sendInvoiceEmail');
const fs = require('fs');

// Route để tạo hóa đơn và gửi qua email
router.post('/createAndSend', async (req, res) => {
    try {
        // Lấy thông tin hóa đơn từ yêu cầu
        const { invoiceData, recipientEmail } = req.body;

        // Tạo hóa đơn PDF tạm thời
        const invoiceFilePath = `./temp_invoice_${Date.now()}.pdf`;
        generateInvoicePDF(invoiceData, invoiceFilePath);

        // Gửi hóa đơn qua email
        await sendInvoiceEmail(recipientEmail, invoiceFilePath);

        // Xóa file hóa đơn tạm thời sau khi gửi
        if (fs.existsSync(invoiceFilePath)) {
            fs.unlinkSync(invoiceFilePath);
        }


        // Trả về kết quả thành công
        return res.json({ success: true, message: 'Hóa đơn đã được tạo và gửi thành công.' });
    } catch (error) {
        console.error('Error creating and sending invoice:', error);
        return res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi tạo và gửi hóa đơn.' });
    }
});

module.exports = router;
