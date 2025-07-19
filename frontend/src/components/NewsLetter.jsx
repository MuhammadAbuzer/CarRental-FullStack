import React, { useContext } from "react";
import { ThemeContext } from "../context/ToggleThemeContext";
import { motion } from "framer-motion"; // ← import motion

const NewsLetter = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`flex flex-col items-center justify-center text-center mt-7 mx-7 mb-4 space-y-2 ${
        isDark ? "text-white" : "text-black"
      }`}
    >
      <motion.h1
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
        className="md:text-4xl text-2xl font-semibold"
      >
        Never Miss a Deal!
      </motion.h1>
      <motion.p
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`md:text-lg pb-8 ${
          isDark ? "text-gray-400" : "text-gray-500/70"
        }`}
      >
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </motion.p>

      <motion.form
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
        onSubmit={handleSubmit}
        className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
      >
        <input
          className={`border h-full outline-none w-full px-3 text-sm md:text-base rounded-l-md ${
            isDark
              ? "bg-black text-white border-gray-700 placeholder:text-gray-500"
              : "bg-white text-gray-700 border-gray-300"
          }`}
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primarydull transition-all cursor-pointer rounded-r-md text-sm md:text-base"
        >
          Subscribe
        </button>
      </motion.form>
    </div>
  );
};

export default NewsLetter;
