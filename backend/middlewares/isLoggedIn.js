import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const UserInfo = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token || token === "null" || token === "undefined") {
      return res
        .status(401)
        .json({ success: false, message: "Missing or invalid token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user found. Please login again.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export default UserInfo;
