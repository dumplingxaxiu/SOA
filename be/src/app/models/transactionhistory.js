const mongoose = require('mongoose');

// Định nghĩa schema cho transaction history
const transactionHistorySchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tuitionID: {
        type: String,
        required: true
    },
    tuition: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Paid', 'Unpaid'], // Chỉ chấp nhận giá trị 'Paid' hoặc 'Unpaid'
        default: 'Unpaid'
    }
});

// Tạo model từ schema
const TransactionHistory = mongoose.model('TransactionHistory', transactionHistorySchema);

module.exports = TransactionHistory;
