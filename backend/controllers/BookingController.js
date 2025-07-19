import Booking from "../models/Booking.js";
import Car from "../models/Cars.js";
import User from "../models/UserModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const isCarAvailable = async (carId, newPickupDate, newReturnDate) => {
  const pickup = new Date(newPickupDate);
  const returnD = new Date(newReturnDate);

  const overlappingBookings = await Booking.findOne({
    car: carId,
    $or: [
      {
        pickupDate: { $lte: returnD },
        returnDate: { $gte: pickup },
      },
    ],
  });

  return !overlappingBookings;
};
export const checkingAvalaibilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    if (picked.toDateString() === returned.toDateString()) {
      return res.status(400).json({
        success: false,
        message: "Pickup and return date cannot be the same",
      });
    }

    const normalizedLocation = location.trim();

    const cars = await Car.find({
      location: { $regex: new RegExp(`^${normalizedLocation}$`, "i") },
      isAvailable: true,
    });

    const results = await Promise.all(
      cars.map(async (car) => {
        const available = await isCarAvailable(car._id, pickupDate, returnDate);
        return { car, available };
      })
    );

    const availableCars = results
      .filter((item) => item.available)
      .map((item) => item.car);
    const unAvailableCars = results
      .filter((item) => !item.available)
      .map((item) => item.car);

    if (availableCars.length === 0) {
      return res.status(400).json({
        message: "No cars available during this interval.",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Availability fetched successfully",
      availableCars,
      unAvailableCars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getConflictingBookings = async (req, res) => {
  try {
    const { carId, pickupDate, returnDate } = req.body;

    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);

    const bookings = await Booking.find({
      car: carId,
      $or: [
        {
          pickupDate: { $lte: returnD },
          returnDate: { $gte: pickup },
        },
      ],
    });

    res
      .status(200)
      .json({ message: "cinfilcted dated", success: true, bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createBooking = async (req, res) => {
  try {
    const userInfo = await User.findById(req.user._id);
    const { car, returnDate, pickupDate, availableDays } = req.body;

    const isAvailable = await isCarAvailable(car, returnDate, pickupDate);
    if (!isAvailable) {
      return res
        .status(400)
        .json({ message: "Car Unavailable", success: false });
    }

    const carData = await Car.findById(car);

    if (!carData) {
      return res.status(404).json({ message: "Car not found", success: false });
    }

    const price =
      Array.isArray(availableDays) && availableDays.length > 0
        ? availableDays.length * carData.pricePerDay
        : 0;

    await Booking.create({
      car,
      pickupDate,
      returnDate,
      user: userInfo._id,
      price,
    });

    res.status(200).json({ message: "Car Booked successfully", success: true });
  } catch (error) {
    console.log("Error occurred", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const myBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const myBookings = await Booking.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("car");

    if (!myBookings) {
      return res
        .status(400)
        .json({ message: "No bookings Founds", success: false });
    }

    res.status(200).json({
      message: "Your Bookings fetched successfully",
      myBookings,
      success: true,
    });
  } catch (error) {
    console.log("Error occured", error);
    return res
      .status(500)
      .json({ message: "Internel server error", success: false });
  }
};

export const adminStats = async (req, res) => {
  try {
    const latestBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(4)
      .populate("car");

    const totalCars = await Car.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const pending = await Booking.countDocuments({ status: "pending" });
    const confirmed = await Booking.countDocuments({ status: "confirmed" });

    const monthlyRevenue = await Booking.aggregate([
      { $match: { status: "confirmed" } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalRevenue: { $sum: "$price" },
          totalBookings: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 },
      },
      {
        $limit: 12,
      },
    ]);

    const manageBookings = await Booking.find();

    res.status(200).json({
      success: true,
      message: "Your Stats",
      stats: {
        latestBookings,
        totalCars,
        totalBookings,
        pending,
        confirmed,
        monthlyRevenue,
        manageBookings,
      },
    });
  } catch (error) {
    console.log("Error occurred", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const updatingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;

    const updatedStatus = await Booking.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    ).populate("user car");

    if (!updatedStatus) {
      return res
        .status(400)
        .json({ message: "Unable to update status", success: false });
    }

    const userEmail = updatedStatus.user.email;
    const carName = `${updatedStatus.car.brand} ${updatedStatus.car.model}`;
    const subject = "Car Booking Status Updated";
    const text = `Dear ${
      updatedStatus.user.name || "User"
    },\n\nYour booking for "${carName}" has been updated to "${newStatus}".\n\nThank you for using our service!\nCar Rental Team`;

    await sendEmail(userEmail, subject, text);

    res.status(200).json({
      message: "Status updated successfully and email sent!",
      success: true,
      updatedStatus,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const AllBookings = async (req, res) => {
  try {
    const AllBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate("car");

    if (!AllBookings) {
      return res
        .status(400)
        .json({ message: "Bookings not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Recent Bookings", success: true, AllBookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internel Server Error", success: false });
  }
};

export const singleBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const singleBooking = await Booking.findById(id).populate("car user");

    if (!singleBooking) {
      return res.status(400).json({
        message: "Unable to find the Booking Details",
        success: false,
      });
    }

    res
      .status(200)
      .json({ message: "Booking details", success: true, singleBooking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internel Server Error", success: false });
  }
};
