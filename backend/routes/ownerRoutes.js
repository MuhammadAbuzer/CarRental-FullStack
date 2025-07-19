import express from "express";
import AddCar, {
  togglingAvalability,
  UpdateCar,
  updatingUserImage,
} from "../controllers/OwnerController.js";
import upload from "../middlewares/upload.js";
import { DeleteCar, getAllCars } from "../controllers/OwnerController.js";
import {
  adminStats,
  AllBookings,
  checkingAvalaibilityOfCar,
  createBooking,
  getConflictingBookings,
  myBookings,
  singleBooking,
  updatingStatus,
} from "../controllers/BookingController.js";
import UserInfo from "../middlewares/isLoggedIn.js";
import AuthInfo from "../controllers/AuthInfoController.js";
import { searchingCar } from "../controllers/UserController.js";

const ownerRouter = express.Router();
ownerRouter.post("/add-car", upload.single("image"), AddCar);
ownerRouter.delete("/delete-car/:id", DeleteCar);
ownerRouter.get("/get-all-cars", getAllCars);
ownerRouter.get("/admin-Stats", adminStats);
ownerRouter.get("/my-bookings", UserInfo, myBookings);
ownerRouter.post("/create-booking", UserInfo, createBooking);
ownerRouter.post("/checking-availability", checkingAvalaibilityOfCar);
ownerRouter.post(
  "/updating-image",
  upload.single("image"),
  UserInfo,
  updatingUserImage
);
ownerRouter.get("/userInfo", AuthInfo);
ownerRouter.post("/updating-availability/:id", togglingAvalability);
ownerRouter.put("/updating-status/:id", updatingStatus);
ownerRouter.get("/get-all-bookings", AllBookings);
ownerRouter.put("/update-car/:id", upload.single("image"), UpdateCar);
ownerRouter.post("/search-car", searchingCar);
ownerRouter.post("/booking-conflicts", getConflictingBookings);
ownerRouter.get("/single-booking/:id", singleBooking);
export default ownerRouter;
