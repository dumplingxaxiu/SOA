const mongoose = require('mongoose');

const tuitionSchema = new mongoose.Schema({
    tuitionID: {
        type: String,
        required: true,
        unique: true,
        default: () => {
            return 'TUITION' + Math.floor(100000 + Math.random () * 900000).toString();
        }
    },
    studentID: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        enum: ['HK1', 'HK2', 'HK3'],
        required: true
    },
    tuition: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        required: true,
        default: "Unpaid"
    }
});

// Tạo model từ schema và xuất nó
const Tuition = mongoose.model('Tuition', tuitionSchema);

module.exports = Tuition;