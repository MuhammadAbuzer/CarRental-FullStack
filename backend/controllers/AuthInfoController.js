import User from "../models/UserModel.js";

const AuthInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User found successfully",
      user,
    });
  } catch (error) {
    console.log("AuthInfo error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default AuthInfo;
