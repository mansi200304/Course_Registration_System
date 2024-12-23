const express = require("express");
const router = express.Router();
const User = require("../models/Students");
const Course = require("../models/Course");
const authenticateStudent = require("../middleware/authenticateStudent");

const authenticate = require("../middleware/authenticate"); 

// Route to fetch user data
router.get("/data", authenticate, async (req, res) => {
    try {
        // Get user ID from the authenticated request
        const userId = req.user.userId;
        console.log(userId);
        // Fetch the user from the database
        const user = await User.findById(userId); // Select only necessary fields

        console.log(user);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Return the user data in response
        res.json({
            name: user.name,
            course: user.course,
            dob: user.dob,
            email: user.email,
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});
router.post("/enroll-course", authenticate, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { selectedCourses } = req.body;

        // Find the student by userId
        const student = await User.findById(userId);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        // Iterate through the selected courses and update each course
        for (const selectedCourse of selectedCourses) {
            // Find the course by courseId (converted to ObjectId)
            const course = await Course.findById(selectedCourse.courseId);
            if (!course) {
                return res.status(404).json({ message: `Course with ID ${course.courseId} not found.` });
            }

            // Add the student ID to the 'students' array of the course
            course.students.push(student._id);
            await course.save();  // Save the updated course document
        }

        // Optionally, you can update the student document as well, to reflect the courses they're enrolled in
        // student.courses = selectedCourses.map(course => course.courseId);
        // await student.save();

        res.status(200).json({ message: "Courses enrolled successfully." });

    } catch (error) {
        console.error("Error enrolling in courses:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});


module.exports = router;
