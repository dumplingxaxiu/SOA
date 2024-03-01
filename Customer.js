const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    CustomerID: {
        type: String,
        required: true,
        unique: true
    },
    FullName: {
        type: String,
        required: true
    },
    BankAccountNumber: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    BankBalance: {
        type: Number,
        required: true
    },
    UserName: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
        minlength: 11
    }
});

// Tạo model từ schema và xuất nó
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
