import React, { useContext, useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { fetchingAvailableCars } from "../Redux/Features/BookingSlice";
import CarCard from "../components/CarCard";
import { ThemeContext } from "../context/ToggleThemeContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Hero = () => {
  const [pickupLocation, setPickUpLocation] = useState("");
  const [pickupDate, setPickUpDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const dispatch = useDispatch();
  const { availableCars, togglingStatusLoading } = useSelector(
    (state) => state.bookings
  );
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickupDate || !returnDate || !location)
      return alert("Please select both dates");

    if (pickupDate === returnDate) {
      return toast.error("Car can only be book for at least one day");
    }

    if (pickupDate > returnDate) {
      return toast.error("OOPS! please choose the dates carefully");
    }
    setHasSearched(true);

    dispatch(
      fetchingAvailableCars({
        location: pickupLocation,
        pickupDate,
        returnDate,
      })
    );
  };

  return (
    <section
      className={`w-full min-h-screen px-4 py-12 flex flex-col items-center ${
        isDark ? "bg-black text-white" : "bg-light text-black"
      }`}
    >
      {/* Heading */}
      <motion.h1
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, damping: 20 }}
        className="text-4xl md:text-5xl font-bold text-center leading-snug mb-8"
      >
        🚗 Rent Luxury Cars Anytime, Anywhere
      </motion.h1>

      {/* Form + Hero Image */}
      <div className="w-full max-w-6xl flex flex-col items-center gap-10">
        {/* Search Form */}
        <motion.form
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, damping: 20 }}
          onSubmit={handleSubmit}
          className={`w-full rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 border ${
            isDark
              ? "bg-black border-gray-700 text-white"
              : "bg-white border-gray-200 text-black"
          }`}
        >
          {/* Pickup Location */}
          <div className="flex flex-col items-start w-full md:w-auto">
            <label className="text-sm font-medium mb-1">Pick-up Location</label>
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickUpLocation(e.target.value)}
              className={`border rounded-lg px-4 py-2 w-full md:min-w-[180px] outline-none ${
                isDark
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              <option value="">Select City</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Date */}
          <div className="flex flex-col items-start w-full md:w-auto">
            <label className="text-sm font-medium mb-1">Pick-up Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickUpDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
              className={`border rounded-lg px-4 py-2 w-full md:min-w-[160px] outline-none ${
                isDark
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white text-black"
              }`}
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col items-start w-full md:w-auto">
            <label className="text-sm font-medium mb-1">Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
              className={`border rounded-lg px-4 py-2 w-full md:min-w-[160px] outline-none ${
                isDark
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white text-black"
              }`}
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-primary/90 transition"
          >
            <img
              src={assets.search_icon}
              alt="search"
              className="w-5 h-5 brightness-200"
            />
            {togglingStatusLoading ? "Searching...." : "Search"}
          </button>
        </motion.form>

        {(!hasSearched || availableCars.length === 0) && (
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, damping: 20 }}
            src={assets.main_car}
            alt="Main Car"
            className="w-full max-w-4xl object-contain"
          />
        )}
      </div>

      {/* Show Available Cars if found */}
      {availableCars && availableCars.length > 0 && (
        <div className="w-full max-w-6xl mt-12 flex flex-col gap-8 px-2">
          <h2 className="text-2xl font-semibold text-center">Available Cars</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {availableCars.map((car, i) => (
              <CarCard key={i} car={car} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
