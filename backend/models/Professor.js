const mongoose = require("mongoose");


const ProfessorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    branch: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: 'professor'
    }
}, { timestamps: true });

module.exports = mongoose.model('Professor', ProfessorSchema);
