const express = require("express");
const { registerUser, loginUser } = require("../controllers/authControllers"); // Import controllers
const { authenticateJWT } = require("../middleware/authMiddleware"); // Add JWT middleware for protected routes

const router = express.Router();

// User registration route
router.post("/register-user", registerUser);

// User login route
router.post("/login-user", loginUser);

// Example of a protected route that requires authentication (JWT check)
router.get("/protected", authenticateJWT, (req, res) => {
  res.status(200).json({ message: "This is a protected route!" });
});

module.exports = router;
