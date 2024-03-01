const mongoose = require('mongoose');

const tuitionSchema = new mongoose.Schema({
    tuitionID: {
        type: String,
        required: true,
        unique: true
    },
    StudentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    Semester: {
        type: String,
        enum: ['HK1', 'HK2', 'HK3'],
        required: true
    },
    Tuition: {
        type: Number,
        required: true
    },
    State: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        required: true
    }
});

// Tạo model từ schema và xuất nó
const Tuition = mongoose.model('Tuition', tuitionSchema);

module.exports = Tuition;