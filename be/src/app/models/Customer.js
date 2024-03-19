const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    userID: {
        type: String,
        unique: true,
        required: true,
        default: () => {
            // Tạo userID ngẫu nhiên
            return Math.random().toString(16).substr(2, 8);
        }
    },
    citizenID: {
        type: String,
        required: true,
        unique: true,
        default: () => {
            //Tạo CCCD ngẫu nhiên cho có
            return 'C' + Math.floor(Math.random() * 900 + 100);
        }
    },
    fullName: {
        type: String,
        required: true
    },
    // Thông thường bank account nằm riêng ở một collection vì 1 khách hàng có thể mở nhiều tài khoản và tài khoản NH phân thành nhiều loại
    bankAccountNumber: {
        type: String,
        required: true,
        unique: true,
        default: () => {
            //Tạo 12 số ngẫu nhiên
            return Math.floor(100000000000 + Math.random() * 900000000000).toString();
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        default: () => {
            //Tạo 9 số ngẫu nhiên
            return '0' + Math.floor(100000000 + Math.random() * 900000000).toString();
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

// Tạo model từ schema và xuất nó
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
