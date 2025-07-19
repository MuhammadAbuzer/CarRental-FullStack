import React, { useState, useContext, useEffect } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { ThemeContext } from "../../context/ToggleThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchingSingleCar, updatingCar } from "../../Redux/Features/CarSlice";
import { useParams } from "react-router-dom";

const EditCar = () => {
  const [image, setImage] = useState(null);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchingSingleCar(id));
  }, [dispatch]);

  const { singleCar, loadingSingleCar } = useSelector((state) => state.car);

  useEffect(() => {
    if (singleCar) {
      setCar({
        brand: singleCar.brand || "",
        model: singleCar.model || "",
        year: singleCar.year || 2024,
        pricePerDay: singleCar.pricePerDay || 0,
        category: singleCar.category || "",
        transmission: singleCar.transmission || "",
        fuel_type: singleCar.fuel_type || "",
        seating_capacity: singleCar.seating_capacity || 4,
        location: singleCar.location || "",
        description: singleCar.description || "",
      });
    }
  }, [singleCar]);

  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 2024,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 4,
    location: "",
    description: "",
  });

  const inputStyle = `px-3 py-2 mt-1 border rounded-md outline-none text-sm ${
    isDark
      ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
      : "bg-white border-borderColor text-black placeholder:text-gray-500"
  }`;

  const labelStyle = `text-sm font-medium ${
    isDark ? "text-gray-300" : "text-gray-700"
  }`;

  const handleSubmit = (e) => {
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

    dispatch(updatingCar({ id, formData }));
  };

  return (
    <div
      className={`px-4 py-10 md:px-10 flex-1 ${
        isDark ? "bg-black text-white" : ""
      }`}
    >
      <Title
        title="Edit Car"
        subTitle="Update the details of your listed vehicle."
      />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 mt-6 max-w-xl"
      >
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : singleCar?.image || assets.upload_icon
              }
              alt="Upload"
              className="h-14 w-20 object-cover rounded cursor-pointer"
            />

            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">Update car image</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className={labelStyle}>Brand</label>
            <input
              type="text"
              placeholder="e.g. BMW"
              className={inputStyle}
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>Model</label>
            <input
              type="text"
              placeholder="e.g. X5"
              className={inputStyle}
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className={labelStyle}>Year</label>
            <input
              type="number"
              className={inputStyle}
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>Price Per Day</label>
            <input
              type="number"
              className={inputStyle}
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>Category</label>
            <select
              className={inputStyle}
              value={car.category}
              onChange={(e) => setCar({ ...car, category: e.target.value })}
            >
              <option value="">Select category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className={labelStyle}>Transmission</label>
            <select
              className={inputStyle}
              value={car.transmission}
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
            >
              <option value="">Select transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>Fuel Type</label>
            <select
              className={inputStyle}
              value={car.fuel_type}
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
            >
              <option value="">Select fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>Seating Capacity</label>
            <input
              type="number"
              className={inputStyle}
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className={labelStyle}>Location</label>
          <select
            className={inputStyle}
            value={car.location}
            onChange={(e) => setCar({ ...car, location: e.target.value })}
          >
            <option value="">Select location</option>
            <option value="Lahore">Lahore</option>
            <option value="Multan">Multan</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Sahiwal">Sahiwal</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className={labelStyle}>Description</label>
          <textarea
            rows={5}
            className={inputStyle}
            placeholder="Describe the car..."
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer"
        >
          <img src={assets.tick_icon} alt="Update" />
          <span>
            {!loadingSingleCar ? (
              <p>Update your car</p>
            ) : (
              <p>updating Car...</p>
            )}
          </span>
        </button>
      </form>
    </div>
  );
};

export default EditCar;
