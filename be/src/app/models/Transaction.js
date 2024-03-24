const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    TransactionID: {
        type: String,
        required: true,
        unique: true,
        default: () => {
            return 'T' + Math.floor(100000000 + Math.random () * 900000000).toString();
        }
    },
    SenderID: {
        type: String,
        required: true
    },
    SenderName: {
        type: String,
        required: true
    },
    ReceiverID: {
        type: String,
        required: true
    },
    ReceiverName: {
        type: String,
        required: true
    },
    TransactionAmount: {
        type: Number,
        required: true
    },
    TransactionDetail: {
        type: String,
        required: true
    },
    TransactionType: {
        type: String,
        enum: ['Deposit', 'Withdrawal', 'Transfer'],
        required: true
    },
    TransactionTime: {
        type: Date,
        default: Date.now
    },
    TransactionState: {
        type: Number,
        default: 0 //-1 = cancelled, 0 = pending, 1 = succeeded
    }
});

// Tạo model từ schema và xuất nó
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
