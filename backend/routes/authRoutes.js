const express = require("express");
// const multer = require("multer");
const { registerUser, loginUser } = require("../controllers/authControllers");

// File upload configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); // Files are saved in the 'uploads' directory
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// const upload = multer({ storage });

const router = express.Router();

// User registration route (with file upload for PhD)
router.post("/register-user", registerUser);

// User login route
router.post("/login", loginUser);

module.exports = router;
