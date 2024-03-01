const mongoose = require('mongoose');

// Định nghĩa schema của collection "Student"
const studentSchema = new mongoose.Schema({
    studentid: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;