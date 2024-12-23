const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Professor = require("../models/Professor");
const authenticateProfessor = require("../middleware/authenticateProfessor");
const authenticateStudent = require("../middleware/authenticateStudent");
const Course = require('../models/Course');  // Ensure the Course model is correctly imported

// Register a professor
router.post("/register", async (req, res) => {
    try {
        const { name, employeeId, subject, email, password } = req.body;

        // Validate input fields
        if (!name || !employeeId || !subject || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the professor already exists
        const existingProfessor = await Professor.findOne({ email });
        if (existingProfessor) {
            return res
                .status(400)
                .json({ message: "Professor already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new professor
        const newProfessor = new Professor({
            name,
            employeeId,
            subject,
            email,
            password: hashedPassword, // Save hashed password
        });

        await newProfessor.save();

        res.status(201).json({ message: "Professor registered successfully" });
    } catch (error) {
        console.error("Error registering professor:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login a professor
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        // Check if the professor exists
        const professor = await Professor.findOne({ email });
        if (!professor) {
            return res.status(404).json({ message: "Professor not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, professor.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: professor._id, email: professor.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            professor: {
                id: professor._id,
                name: professor.name,
                subject: professor.subject,
            },
        });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/dashboard", authenticateProfessor, async (req, res) => {
    try {
        const professor = await Professor.findById(req.user.id);
        
        const courses = await Course.find({ professorId: professor._id })
            .select('title description duration courseType subjectCode credits courseOfferedFor courseOfferedAs');

        res.status(200).json({
            professor: {
                id: professor._id,
                name: professor.name,
                subject: professor.subject,
                credits: professor.credits,
                subjectCode: professor.subjectCode,
                courseOfferedFor: professor.courseOfferedFor,
                courseOfferedAs: professor.courseOfferedAs,
            },
            courses
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Server error" });
    }
});



router.post("/course/add", authenticateProfessor, async (req, res) => {
    try {


        console.log("check data");
        console.log(req.body);
        
        const { title, description, duration,subjectCode,credits, courseOfferedFor, courseOfferedAs } = req.body;

        
        // Create new course with professorId
        const newCourse = new Course({
            title,
            description,
            duration,
            courseOfferedFor,
            courseOfferedAs,
            subjectCode,
            credits,
            professorId: req.user.id  // Add professor ID directly
        });

        const savedCourse = await newCourse.save();

        // Update professor's courses
        await Professor.findByIdAndUpdate(
            req.user.id, 
            { $push: { courses: savedCourse._id } },
            { new: true }
        );

        res.status(201).json({ 
            message: "Course added successfully", 
            course: savedCourse 
        });

    } catch (error) {
        // Error handling
    }
});

router.get("/courses", async (req, res) => {
    try {
        // Retrieve all courses without filtering by professor
        const courses = await Course.find();
        
        // Check if no courses exist
        if (!courses || courses.length === 0) {
            return res.status(404).json({ message: "No courses found" });
        }

        // Return all courses successfully
        res.status(200).json({ 
            totalCourses: courses.length,
            courses 
        });
    } catch (error) {
        // Handle server-side errors
        console.error("Course retrieval error:", error);
        res.status(500).json({ 
            message: "Error fetching courses", 
            error: error.message 
        });
    }
});


router.post("/enroll", authenticateStudent, async (req, res) => {
    try {
        const { courseId } = req.body;

        // Validate input
        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check if the student is already enrolled in the course
        const student = await BTechMTechStudent.findById(req.user.id);
        if (student.coursesSelected.includes(courseId)) {
            return res.status(400).json({ message: "Already enrolled in this course" });
        }

        // Enroll the student in the course
        student.coursesSelected.push(courseId);
        await student.save();

        // Add the student to the course's students array
        course.students.push(student._id);
        await course.save();

        res.status(200).json({ message: "Successfully enrolled in the course", course });
    } catch (error) {
        console.error("Enrollment error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



module.exports = router;
