const express = require("express");
const { registerUser, loginUser } = require("../controllers/authControllers"); // Import controllers

const router = express.Router();

// User registration route
router.post("/register-user", registerUser);

// User login route
router.post("/login-user", loginUser);

module.exports = router;
