// be/src/models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentID: {
        type: String,
        required: true,
        unique: true
    },
    semester: {
        type: String,
        required: true
    },
    tuition: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    tuitionID: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Tuition = mongoose.model('tuitions', studentSchema);

module.exports = Tuition;
