import Car from "../models/Cars.js";
import imagekit from "../configs/imagekit.js";
import fs from "fs";
import User from "../models/UserModel.js";

const AddCar = async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      seating_capacity,
      pricePerDay,
      category,
      fuel_type,
      transmission,
      location,
      description,
    } = req.body;

    const { file } = req;

    if (
      !brand ||
      !model ||
      !year ||
      !seating_capacity ||
      !pricePerDay ||
      !category ||
      !fuel_type ||
      !transmission ||
      !location ||
      !description ||
      !file
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields including image are required",
      });
    }

    const fileBuffer = fs.readFileSync(file.path);
    const uploaded = await imagekit.upload({
      file: fileBuffer,
      fileName: file.originalname,
      folder: "/cars",
    });

    const image = imagekit.url({
      path: uploaded.filePath,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const newCar = {
      brand,
      model,
      year: Number(year),
      seating_capacity: Number(seating_capacity),
      pricePerDay: Number(pricePerDay),
      category,
      fuel_type,
      transmission,
      location,
      description,
      isAvailable: true,
      image,
    };

    await Car.create(newCar);

    res.status(201).json({
      success: true,
      message: "Car added successfully",
    });
  } catch (error) {
    console.error("AddCar Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default AddCar;

export const DeleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletingCar = await Car.findByIdAndDelete(id);

    if (!deletingCar) {
      return res
        .status(400)
        .json({ message: "Unable to delete the car", success: false });
    }

    res
      .status(200)
      .json({ message: "Car deleted successfully", success: true });
    id;
  } catch (error) {
    console.log("Error occured", error);
    return res
      .status(500)
      .json({ message: "Internel server error", success: false });
  }
};

export const getAllCars = async (req, res) => {
  try {
    const AllCars = await Car.find();

    if (!AllCars) {
      return res
        .status(400)
        .json({ message: "Unable to find Cars", success: false });
    }

    res
      .status(200)
      .json({ message: "cars founded Successfully", success: true, AllCars });
  } catch (error) {
    console.log("Error occured", error);
    return res
      .status(500)
      .json({ message: "Internel server error", success: false });
  }
};

export const updatingUserImage = async (req, res) => {
  try {
    const userInfo = await User.findById(req.user._id);
    const { file } = req;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No image provided" });
    }

    const fileBuffer = fs.readFileSync(file.path);

    const uploaded = await imagekit.upload({
      file: fileBuffer,
      fileName: file.originalname,
      folder: "/cars",
    });

    const image = imagekit.url({
      path: uploaded.filePath,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    await User.findByIdAndUpdate(userInfo, { image });

    res
      .status(200)
      .json({ message: "Image updated successfully", success: true });
  } catch (error) {
    console.log("Error occured", error);
    return res
      .status(500)
      .json({ message: "Internel server error", success: false });
  }
};

export const togglingAvalability = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);

    if (!car) {
      return res
        .status(400)
        .json({ message: "Unable to findCar", success: false });
    }

    const changingAvailability = !car.isAvailable;
    const updating = await Car.findByIdAndUpdate(id, {
      isAvailable: changingAvailability,
    });

    if (!updating) {
      return res
        .status(400)
        .json({ message: "Unable to update visibility", success: false });
    }

    res.status(200).json({
      message: "Toggled Availability successfully",
      success: true,
      isAvailable: changingAvailability,
      id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internel server error", success: false });
  }
};

export const UpdateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      brand,
      model,
      year,
      seating_capacity,
      pricePerDay,
      category,
      fuel_type,
      transmission,
      location,
      description,
    } = req.body;

    const { file } = req;

    if (
      !brand ||
      !model ||
      !year ||
      !seating_capacity ||
      !pricePerDay ||
      !category ||
      !fuel_type ||
      !transmission ||
      !location ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields including image are required",
      });
    }

    let image = null;

    if (file) {
      const fileBuffer = fs.readFileSync(file.path);
      const uploaded = await imagekit.upload({
        file: fileBuffer,
        fileName: file.originalname,
        folder: "/cars",
      });

      image = imagekit.url({
        path: uploaded.filePath,
        transformation: [
          { width: "1280" },
          { quality: "auto" },
          { format: "webp" },
        ],
      });
    }

    const newCar = {
      brand,
      model,
      year: Number(year),
      seating_capacity: Number(seating_capacity),
      pricePerDay: Number(pricePerDay),
      category,
      fuel_type,
      transmission,
      location,
      description,
      isAvailable: true,
    };

    if (image) {
      newCar.image = image;
    }

    const updatedCar = await Car.findByIdAndUpdate(id, newCar, { new: true });

    if (!updatedCar) {
      return res
        .status(400)
        .json({ message: "Unable to update car", success: false });
    }

    res.status(200).json({
      message: "Car updated successfully",
      success: true,
      updatedCar,
      id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internel server error", success: false });
  }
};
