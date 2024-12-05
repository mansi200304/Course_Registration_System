const express = require('express');
const Course = require('../models/Course');  // Ensure the Course model is correctly imported

const router = express.Router();

// Get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new course (for example)
router.post('/add-course', async (req, res) => {
  const { title, description, duration } = req.body;

  try {
    const newCourse = new Course({ title, description, duration });
    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
