import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../components/owner/Title";
import { AddingCar } from "../../Redux/Features/AdminStatsSlice";
import { ThemeContext } from "../../context/ToggleThemeContext";

const AddCar = () => {
  const dispatch = useDispatch();
  const { addCarLoading } = useSelector((state) => state.dashboardData);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const currency = import.meta.env.VITE_CURRENCY;

  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brand", car.brand);
    formData.append("model", car.model);
    formData.append("year", car.year);
    formData.append("pricePerDay", car.pricePerDay);
    formData.append("category", car.category);
    formData.append("transmission", car.transmission);
    formData.append("fuel_type", car.fuel_type);
    formData.append("seating_capacity", car.seating_capacity);
    formData.append("location", car.location);
    formData.append("description", car.description);
    formData.append("image", image);

    dispatch(AddingCar(formData)).unwrap();
  };

  const inputClass = `px-3 py-2 mt-1 rounded-md outline-none transition-colors duration-200 border ${
    isDark
      ? "bg-neutral-900 text-white border-gray-700 placeholder-gray-500"
      : "bg-white text-black border-borderColor placeholder-gray-400"
  }`;

  return (
    <div
      className={`px-4 py-10 md:px-10 flex-1 ${
        isDark ? "bg-black text-white" : "bg-light text-black"
      }`}
    >
      <Title
        title="Add Car"
        subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
      />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-sm mt-6 max-w-xl"
      >
        {/* Upload Section */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="Car"
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
        </div>

        {/* Brand & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Brand</label>
            <input
              type="text"
              placeholder="Enter Brand e.g. BMW, Mercedes, Audi ..."
              required
              className={inputClass}
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Model</label>
            <input
              type="text"
              placeholder="Enter Model e.g. x5, Eclass, M4..."
              required
              className={inputClass}
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/* Year, Price, Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Year</label>
            <input
              type="number"
              placeholder="2025"
              required
              className={inputClass}
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Daily Price ({currency})</label>
            <input
              type="number"
              placeholder="100"
              required
              className={inputClass}
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Category</label>
            <select
              value={car.category}
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              className={inputClass}
            >
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* Transmission, Fuel, Seating */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Transmission</label>
            <select
              value={car.transmission}
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              className={inputClass}
            >
              <option value="">Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label>Fuel Type</label>
            <select
              value={car.fuel_type}
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              className={inputClass}
            >
              <option value="">Select a Fuel Type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label>Seating Capacity</label>
            <input
              type="number"
              placeholder="4"
              required
              className={inputClass}
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col w-full">
          <label>Location</label>
          <select
            value={car.location}
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            className={inputClass}
          >
            <option value="">Select a location</option>
            <option value="Sahiwal">Sahiwal</option>
            <option value="Lahore">Lahore</option>
            <option value="Multan">Multan</option>
            <option value="Faislabad">Faislabad</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea
            rows={5}
            placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine."
            required
            className={inputClass}
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer">
          <img src={assets.tick_icon} alt="" />
          {addCarLoading ? <p>Adding Car...</p> : <p>List Your Car</p>}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
