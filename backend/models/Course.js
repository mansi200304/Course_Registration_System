const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },  // E.g., "3 months"
});

module.exports = mongoose.model('Course', courseSchema);
