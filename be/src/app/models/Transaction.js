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
    },
    TransactionState: {
        type: Number,
        default: 0 //-1 = cancelled, 0 = pending, 1 = succeeded
    }
});

// Tạo model từ schema và xuất nó
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
