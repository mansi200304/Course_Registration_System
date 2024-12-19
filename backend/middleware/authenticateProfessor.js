const jwt = require("jsonwebtoken");
const Professor = require("../models/Professor");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const professor = await Professor.findById(decodedToken.userId);

        if (!professor) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = { id: professor._id };
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
