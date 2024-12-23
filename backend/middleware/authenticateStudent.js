const jwt = require("jsonwebtoken");
const Student = require("../models/Students");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const student = await Student.findById(decodedToken.userId);

        if (!student) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = { id: student._id };
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
