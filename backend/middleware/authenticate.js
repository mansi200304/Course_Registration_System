const jwt = require("jsonwebtoken");

// Middleware to authenticate user
const authenticate = (req, res, next) => {
    // Get the token from Authorization header (assuming Bearer token format)
    const token = req.header("Authorization")?.replace("Bearer ", ""); // Remove "Bearer " part

    if (!token) {
        console.error("Authentication token missing in request.");
        return res
            .status(401)
            .json({ message: "Authentication token is missing." });
    }

    try {
        // Verify the token using JWT secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        // Attach the decoded user information to the request object
        req.user = decoded; // Assuming the token contains the user's id and other details

        next(); // Call the next middleware or route handler
    } catch (error) {
        // Log the error with a detailed message
        if (error.name === "TokenExpiredError") {
            console.error("JWT token expired.");
        } else if (error.name === "JsonWebTokenError") {
            console.error("JWT token is invalid.");
        } else {
            console.error("Unknown error during JWT verification:", error);
        }

        res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = authenticate;
