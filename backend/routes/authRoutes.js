const express = require("express");
const multer = require("multer");
const { registerUser, loginUser } = require("../controllers/authControllers");

// File upload configuration (uncomment if needed for file uploads)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Files are saved in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Initialize router
const router = express.Router();

// User registration route (with file upload for PhD)
router.post("/register-user", upload.single("file"), registerUser);

// User login route
router.post("/login", loginUser);

module.exports = router;
