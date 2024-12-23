const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    subjectCode: { type: String, required: true },
    credits: { type: String, required: true },
    duration: { type: String, required: true }, // E.g., "3 months"
    professorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor',
        required: true
      },
      courseOfferedFor: {
        type: String,
        required: true,
        enum: ["BTech", "MTech", "PhD"], // This limits the values to BTech, MTech, or PhD
    },
    courseOfferedAs: {
        type: String,
        required: true,
        enum: ["Compulsory", "Open Elective", "Human Science", "Thesis" ], // This limits the values to 'Required' or 'Elective'
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "BTechMTechStudent", // Reference to the Student model
    }]
});

module.exports = mongoose.model("Course", courseSchema);
