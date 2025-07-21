import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { ThemeContext } from "../context/ToggleThemeContext";
import { fetchingCars, searchingCars } from "../Redux/Features/CarSlice";
import { motion } from "framer-motion";

const Cars = () => {
  const { cars, loading, searchedCars, searchedCarsLoading } = useSelector(
    (state) => state.car
  );

  const [searched, setSearched] = useState("");
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visibleCars = searched.trim() === "" ? cars : searchedCars;

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearched(value);

    if (value.trim() === "") {
      dispatch(fetchingCars());
      return;
    }

    dispatch(
      searchingCars({
        brand: value,
        model: value,
        category: value,
      })
    );
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <div
        className={`lg:mb-11 pb-10 ${
          isDark ? "bg-black text-white" : "bg-light text-black"
        }`}
      >
        <div className="flex flex-col items-center py-20 px-4 text-center">
          <Title
            title="Available Cars"
            subtitle="Browse our selection of premium vehicles available for your next adventure."
          />
        </div>

        {/* 🔍 Search bar */}
        <div
          className={`flex items-center max-w-screen-lg mx-auto h-12 rounded-full shadow px-4 
          ${isDark ? "bg-transparent border border-gray-700" : "bg-white"}`}
        >
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-5 h-5 mr-3 opacity-70"
          />
          <input
            value={searched}
            onChange={handleSearch}
            type="text"
            placeholder="Search by make, model, or features"
            className={`flex-grow outline-none text-sm placeholder:text-gray-400 ${
              isDark ? "bg-transparent text-white" : "text-gray-600"
            }`}
          />
          <img
            src={assets.filter_icon}
            alt="Filter"
            className="w-5 h-5 ml-3 opacity-70"
          />
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p
          className={`text-sm mb-2 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Showing {visibleCars.length} Cars
        </p>

        {loading || searchedCarsLoading ? (
          <div className="flex justify-center items-center h-52">
            <SyncLoader color="#2563eb" size={15} />
          </div>
        ) : visibleCars.length > 0 ? (
          <motion.div
            // variants={containerVariants}
            // initial="hidden"
            // whileInView="show"
            // viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 mb-7 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto"
          >
            {visibleCars.map((car) => (
              <motion.div key={car._id}>
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            No cars found matching your search.
          </div>
        )}
      </div>
    </>
  );
};

export default Cars;
