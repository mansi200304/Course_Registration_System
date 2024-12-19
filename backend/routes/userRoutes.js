const express = require("express");
const router = express.Router();
const User = require("../models/Students");

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

module.exports = router;
