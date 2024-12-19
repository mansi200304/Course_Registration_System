const mongoose = require("mongoose");

const phdStudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    mentorTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "Professor" },
    researchProposal: { type: String, required: true }, // File path or URL
    sop: { type: String, required: true }, // File path or URL
});


module.exports = mongoose.model("PhDStudent", phdStudentSchema);
