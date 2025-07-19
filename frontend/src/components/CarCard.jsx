import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ToggleThemeContext";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const { user } = useSelector((state) => state.userInfo);
  return (
    <div
      onClick={() => {
        if (!user) {
          return Swal.fire("Pleae Login First!");
        }
        navigate(`/car-details/${car._id}`);
      }}
      className={`group rounded-xl overflow-hidden shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Image & Overlays */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt="Car"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Availability Badge */}
        {car.isAvailable ? (
          <p className="absolute top-3 left-3 bg-primary/90 text-white text-xs px-2.5 py-1 rounded-full">
            Available Now
          </p>
        ) : (
          <p className="absolute top-3 left-3 bg-red-400 text-white text-xs px-2.5 py-1 rounded-full">
            Not Available
          </p>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-md text-sm">
          {currency} {car.pricePerDay}{" "}
          <span className="text-xs font-light">/ day</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-4">
        {/* Title */}
        <div className="flex justify-between">
          <div>
            {" "}
            <h3 className="text-lg font-semibold">
              {car.brand} {car.model}
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {car.category} • {car.year}
            </p>
          </div>
          <div className="text-lg flex items-center gap-2 font-semibold">
            <img className="w-[12px]" src={assets.location_icon} alt="" />{" "}
            {car.location}
          </div>
        </div>

        {/* Features Grid */}
        <div
          className={`grid grid-cols-2 gap-y-3 gap-x-2 text-sm mt-4 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <div className="flex items-center">
            <img src={assets.users_icon} alt="" className="h-4 w-4 mr-2" />
            {car.seating_capacity} Seats
          </div>
          <div className="flex items-center">
            <img src={assets.fuel_icon} alt="" className="h-4 w-4 mr-2" />
            {car.fuel_type}
          </div>
          <div className="flex items-center">
            <img src={assets.car_icon} alt="" className="h-4 w-4 mr-2" />
            {car.transmission}
          </div>
          <div className="flex items-center">
            <img src={assets.location_icon} alt="" className="h-4 w-4 mr-2" />
            {car.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
