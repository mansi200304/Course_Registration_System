const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true }, // E.g., "3 months"
    professorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor',
        required: true
      },
    courseRequired: {
        type: String,
        required: true,
        enum: ["BTech", "MTech", "PhD"], // This limits the values to BTech, MTech, or PhD
    },
    courseType: {
        type: String,
        required: true,
        enum: ["Compulsory", "Elective"], // This limits the values to 'Required' or 'Elective'
    },
});

module.exports = mongoose.model("Course", courseSchema);
