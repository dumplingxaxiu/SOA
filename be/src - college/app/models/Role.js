const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Set role cho username
const Role = new Schema({
    userID: { 
        type: String,
        unique: true,
        required: true 
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    role: { 
        type: Number, 
        required: true,
        default: 10 }, // 0 = admin; > 10 = user, 10 = customer
});

module.exports = mongoose.model('Role', Role);