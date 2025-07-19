import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { ThemeContext } from "../context/ToggleThemeContext";
import { motion } from "motion/react";

const Banner = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, damping: 20 }}
      viewport={{ once: true, amount: 0.3 }}
      className={`flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden 
        ${
          isDark
            ? "bg-gray-800 text-white border border-gray-700"
            : "bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] text-white"
        }`}
    >
      <div>
        <h2 className="text-3xl font-medium">Do You Own a Luxury Car?</h2>
        <p className="mt-2">
          Monetize your vehicle effortlessly by listing it on CarRental.
        </p>
        <p className="max-w-130">
          We take care of insurance, driver verification and secure payments –
          so you can earn passive income, stress-free.
        </p>
        <button
          className={`px-6 py-2 mt-4 rounded-lg text-sm cursor-pointer transition-all ${
            isDark
              ? "bg-white text-primary hover:bg-gray-200"
              : "bg-white text-primary hover:bg-slate-100"
          }`}
        >
          List your car
        </button>
      </div>

      <img src={assets.banner_car_image} alt="car" className="max-h-45 mt-10" />
    </motion.div>
  );
};

export default Banner;
