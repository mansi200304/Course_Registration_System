const User = require("../models/User"); // Assuming you have a User model
const bcrypt = require("bcrypt"); // For password hashing

// Register new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const file = req.file; // The uploaded file (if any)

        // Check if all required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required." });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user object
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            // Add file data if a file is uploaded (optional)
            file: file ? file.path : null,
        });

        // Save the user to the database
        await newUser.save();

        // Return a success response
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

// Login user (you can customize this as needed)
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        res.status(200).json({ message: "Login successful!", user });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

module.exports = { registerUser, loginUser };
