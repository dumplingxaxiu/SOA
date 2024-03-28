const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Set role cho username
const Role = new Schema({
    studentID: { 
        type: String,
        unique: true,
        required: true 
    },
    role: { 
        type: Number, 
        required: true,
        default: 10 }, // 0 = admin; > 10 = user
});

module.exports = mongoose.model('Role', Role);