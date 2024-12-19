const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Students");
const Professor = require("../models/Professor"); // New Professor model
const PhDStudent = require("../models/PhDStudents");

exports.registerUser = async (req, res) => {
    const { 
        name, 
        course, 
        dob, 
        email, 
        password, 
        userType,
        employeeId, // For professors
        branch      // For professors
    } = req.body;

    try {
        // Check if user already exists across all models
        const existingStudentUser = await Student.findOne({ email });
        const existingPhDUser = await PhDStudent.findOne({ email });
        const existingProfessorUser = await Professor.findOne({ email });

        if (existingStudentUser || existingPhDUser || existingProfessorUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user based on user type
        let newUser;
        switch (userType) {
            case "student":
                if (course === "PhD") {
                    newUser = new PhDStudent({
                        name,
                        course,
                        dob,
                        email,
                        password: hashedPassword,
                        userType
                    });
                } else {
                    newUser = new Student({
                        name,
                        course,
                        dob,
                        email,
                        password: hashedPassword,
                        userType
                    });
                }
                break;

            case "professor":
                newUser = new Professor({
                    name,
                    employeeId,
                    branch,
                    email,
                    password: hashedPassword,
                    userType
                });
                break;

            default:
                return res.status(400).json({ message: "Invalid user type" });
        }

        // Save the new user
        await newUser.save();

        return res.status(201).json({ 
            message: `${userType.charAt(0).toUpperCase() + userType.slice(1)} registered successfully` 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password, userType } = req.body;

    try {
        let user;
        // Determine which model to use based on userType
        switch (userType) {
            case "student":
                user = await Student.findOne({ email }) || 
                       await PhDStudent.findOne({ email });
                break;
            case "professor":
                user = await Professor.findOne({ email });
                break;
            default:
                return res.status(400).json({ message: "Invalid user type" });
        }

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign(
            { 
                userId: user._id, 
                userType: user.userType 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: "24h" }
        );

        // Return user info (adjust based on your model)
        return res.status(200).json({ 
            token, 
            user: { 
                name: user.name, 
                email: user.email,
                userType: user.userType,
                ...(user.course && { course: user.course }),
                ...(user.branch && { branch: user.branch })
            } 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
