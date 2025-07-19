import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const UserInfo = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ success: false, message: "Missing token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "No user found please login again" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internel server error" });
  }
};

export default UserInfo;
