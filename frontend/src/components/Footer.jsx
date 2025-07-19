import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { FaPhoneAlt, FaHome } from "react-icons/fa";
import { ThemeContext } from "../context/ToggleThemeContext";
import { motion } from "framer-motion";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`pt-8 px-6 md:px-16 lg:px-24 xl:px-32 ${
        isDark ? "bg-black text-gray-300" : "bg-light text-gray-500/80"
      }`}
    >
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        {/* Logo + About */}
        <motion.div className="max-w-80" variants={itemVariants}>
          <img
            src={assets.logo}
            alt="Car Rental Logo"
            className="mb-4 h-8 md:h-9"
          />
          <p className="text-sm">
            Drive your dreams with{" "}
            <span className="font-semibold">CarRental</span> — premium cars,
            flexible rental plans, and 24/7 support across major cities.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a href="#">
              <img
                className="w-5 h-5"
                src={assets.facebook_logo}
                alt="Facebook"
              />
            </a>
            <a href="#">
              <img
                className="w-5 h-5"
                src={assets.instagram_logo}
                alt="Instagram"
              />
            </a>
            <a href="#">
              <img className="w-5 h-5" src={assets.gmail_logo} alt="Gmail" />
            </a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants}>
          <p
            className={`text-lg uppercase ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            QuickLinks
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Browse Cars</a>
            </li>
            <li>
              <a href="#">List your cars</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div variants={itemVariants}>
          <p
            className={`text-lg uppercase ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Contact Us
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li className="flex gap-2 items-center">
              <FaPhoneAlt className="w-5 h-5" />
              <a className="text-[17px]" href="tel:+923277396851">
                +92 3277396851
              </a>
            </li>
            <li className="flex items-start gap-2">
              <FaHome className="w-5 h-5 mt-1" />
              <span className="text-[17px]">
                197/W Block FaridTown, Sahiwal
              </span>
            </li>
            <li className="flex items-center gap-2">
              <img className="w-5 h-5" src={assets.gmail_logo} alt="Email" />
              <a
                className="text-[17px]"
                href="mailto:muhammadabuzer256@gmail.com"
              >
                muhammadabuzer256@gmail.com
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div className="max-w-80" variants={itemVariants}>
          <p className={`text-lg ${isDark ? "text-white" : "text-gray-800"}`}>
            GET DEALS & UPDATES
          </p>
          <p className="mt-3 text-sm">
            Join our newsletter for exclusive car rental offers and travel tips.
          </p>
          <div className="flex items-center mt-4">
            <input
              type="text"
              className={`rounded-l h-9 px-3 outline-none border ${
                isDark
                  ? "bg-black text-white border-gray-700"
                  : "bg-white border-gray-300"
              }`}
              placeholder="Your email"
            />
            <button className="flex items-center justify-center bg-primary h-9 w-9 rounded-r">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      <hr className="border-gray-300 mt-8" />
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5 text-sm"
      >
        <p>© {new Date().getFullYear()} CarRentals. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Terms & Conditions</a>
          </li>
          <li>
            <a href="#">Sitemap</a>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
