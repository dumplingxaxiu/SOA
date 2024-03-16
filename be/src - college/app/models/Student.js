const mongoose = require('mongoose');

// Định nghĩa schema của collection "Student"
const studentSchema = new mongoose.Schema({
    studentID: {
        type: String,
        required: true,
        unique: true,
        default: () => {
            return Math.floor(100000000 + Math.random () * 900000000).toString();
        }
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