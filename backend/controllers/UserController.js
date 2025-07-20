import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/Cars.js";
const createTokenAndSetCookie = (res, user) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ✅ Dynamic
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ Lax for dev
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};

export const SigningUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = createTokenAndSetCookie(res, user);
    res.status(201).json({
      success: true,
      message: "User registerd successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = createTokenAndSetCookie(res, user);
    res
      .status(200)
      .json({ success: true, message: "Login successful", token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const LogOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSingleCar = async (req, res) => {
  try {
    const { id } = req.params;

    const singleCar = await Car.findById(id);

    if (!singleCar) {
      return res
        .status(400)
        .json({ message: "Unable to find car", success: false });
    }

    res
      .status(200)
      .json({ message: "Car founded successsfully", success: true, singleCar });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const searchingCar = async (req, res) => {
  try {
    const { brand, model, category } = req.body;

    const searchText = brand || model || category;

    const searched = await Car.find({
      $or: [
        { brand: { $regex: searchText, $options: "i" } },
        { model: { $regex: searchText, $options: "i" } },
        { category: { $regex: searchText, $options: "i" } },
      ],
    });

    if (!searched) {
      return res.status(400).json({ message: "No car found", success: false });
    }

    res.status(200).json({
      message: "cars according to the specific keyword",
      success: true,
      searched,
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
