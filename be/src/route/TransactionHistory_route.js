
const TransactionHistory = require('../app/models/transactionhistory');

const route = (app) => {
    // Khai báo endpoint và xử lý yêu cầu GET
    app.get("/api/fetchtranhistory", async (req, res) => {
        try {
            // Truy vấn cơ sở dữ liệu để lấy tất cả giao dịch
            const transactions = await TransactionHistory.find();
            // Trả về dữ liệu dưới dạng JSON
            res.json(transactions);
        } catch (err) {
            // Xử lý lỗi nếu có
            console.error('Error fetching transaction history:', err);
            res.status(500).json({ error: 'Error fetching transaction history' });
        }
    });
}

module.exports = route;
