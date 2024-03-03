const mongoose = require('mongoose');

const transactionHistorySchema = new mongoose.Schema({
    TransactionID: {
        type: String,
        required: true,
        unique: true
    },
    SenderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    SenderName: {
        type: String
    },
    ReceiverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    ReceiverName: {
        type: String
    },
    
    TransactionAmount: {
        type: Number,
        required: true
    },
    TransactionContent: {
        type: String
    },
    TransactionType: {
        type: String,
        enum: ['Deposit', 'Withdrawal', 'Transfer'],
        required: true
    },
    TransactionTime: {
        type: Date,
        default: Date.now
    }
});

// Tạo model từ schema và xuất nó
const TransactionHistory = mongoose.model('TransactionHistory', transactionHistorySchema);

module.exports = TransactionHistory;
