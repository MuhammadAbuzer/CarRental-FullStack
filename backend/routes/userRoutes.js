import express from "express";
import {
  SigningUp,
  LogIn,
  LogOut,
  getSingleCar,
} from "../controllers/UserController.js";
import UserInfo from "../middlewares/isLoggedIn.js";
import AuthInfo from "../controllers/AuthInfoController.js";
const userrouter = express.Router();

userrouter.post("/register", SigningUp);

userrouter.post("/login", LogIn);

userrouter.get("/data", UserInfo, AuthInfo);

userrouter.get("/logout", LogOut);

userrouter.get("/get-single-car/:id", getSingleCar);

export default userrouter;
