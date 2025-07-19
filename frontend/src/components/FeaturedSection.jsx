import React, { useContext } from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { ThemeContext } from "../context/ToggleThemeContext";
import { motion } from "framer-motion";

const FeaturedSection = () => {
  const { cars, loading } = useSelector((state) => state.car);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
      <div>
        <Title
          title="Featured Vehicles"
          subtitle="Explore our selection of premium vehicles available for your next adventure."
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-52">
          <SyncLoader color="#2563eb" size={15} />
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18"
        >
          {cars.slice(0, 6).map((car) => (
            <motion.div
              key={car._id}
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <button
        onClick={() => navigate("/cars")}
        className={`flex items-center justify-center gap-2 mt-6 px-6 py-2 border border-borderColor rounded-md cursor-pointer ${
          isDark ? "bg-transparent text-white" : "hover:bg-gray-50"
        }`}
      >
        Explore all cars
        <img src={assets.arrow_icon} alt="arrow" />
      </button>
    </div>
  );
};

export default FeaturedSection;
