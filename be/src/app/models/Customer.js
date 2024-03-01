const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    CustomerID: {
        type: String,
        required: true,
        unique: true,
        default: function() {
            // Tạo CustomerID bắt đầu từ số 100
            //cái này nên là CCCD
            return 'C' + Math.floor(Math.random() * 900 + 100);
        }
    },
    FullName: {
        type: String,
        required: true
    },
    BankAccountNumber: {
        type: String,
        required: true,
        unique: true,
        default: function() {
            //random 12 so
            return 'C' + Math.floor(Math.random() * 900000000000 + 100000000000);
        }
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
        required: true,
        default: 0
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
