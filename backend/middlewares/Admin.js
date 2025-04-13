import jwt from "jsonwebtoken";
import User from "../models/Register.js"; // Import User model
import dotenv from "dotenv";
dotenv.config();
 const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from headers
    console.log("The token is:",token);
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT
    console.log("MAHI IS SMART");
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = user; // Attach user data to request
    next(); // Continue to the next middleware
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
export default verifyAdmin;