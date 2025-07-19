import React, { useContext, useState, useEffect } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineMenuOpen } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { LogOut } from "../Redux/Features/LogInSlice";
import { ThemeContext } from "../context/ToggleThemeContext";
import { AnimatePresence, motion } from "motion/react";

const Navbar = ({ setShowLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.userInfo);
  const [open, setOpen] = useState(false);
  const [shadow, setShadow] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const handleLogIn = () => setShowLogin(true);
  const handleLogOut = () => dispatch(LogOut());

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className={`w-full z-50 border-b transition-all duration-300 ${
        isDark
          ? "bg-black text-white border-borderColor"
          : "bg-white text-gray-700 border-borderColor"
      } ${shadow ? "shadow-md" : ""}`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, damping: 20 }}
        className="max-w-screen-xl mx-auto flex items-center justify-between px-6 md:px-10 lg:px-16 xl:px-24 py-4"
      >
        <Link to="/">
          <img
            src={assets.logo}
            alt="logo"
            className="h-8 transition-all duration-300 "
          />
        </Link>

        <div className="hidden md:flex items-center gap-10 text-base font-medium">
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`transition hover:text-primary ${
                location.pathname === link.path
                  ? "text-primary font-semibold"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Theme Switch */}
          <div className="flex items-center ml-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
              <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-slate-500 transition-all duration-300" />
              <span className="dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-6" />
            </label>
          </div>

          {/* User Actions */}
          <div className="hidden lg:flex items-center gap-4 ml-6">
            {user?.role === "Owner" && (
              <button
                onClick={() => navigate("/owner")}
                className={`border px-4 py-1 rounded-full transition ${
                  isDark
                    ? "bg-transparent border-white hover:bg-white hover:text-black"
                    : "border-borderColor hover:bg-gray-100"
                }`}
              >
                Dashboard
              </button>
            )}

            {user ? (
              <button
                onClick={handleLogOut}
                className={`px-5 py-2 rounded-lg transition-all ${
                  isDark
                    ? "border border-white bg-transparent text-white hover:bg-white hover:text-black"
                    : "bg-primary text-white hover:bg-primarydull"
                }`}
              >
                LogOut
              </button>
            ) : (
              <button
                onClick={handleLogIn}
                className="bg-primary hover:bg-primarydull text-white px-5 py-2 rounded-lg transition-all"
              >
                LogIn
              </button>
            )}
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden block">
          {!open ? (
            <MdOutlineMenuOpen
              onClick={() => setOpen(true)}
              className="size-9 cursor-pointer"
            />
          ) : (
            <RxCross2
              onClick={() => setOpen(false)}
              className="size-9 cursor-pointer"
            />
          )}
        </div>
      </motion.div>

      {/* Mobile Slide-In Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? "0%" : "100%" }}
        transition={{ duration: 0.2, ease: "easeInOut", damping: 20 }}
        className={`md:hidden fixed top-16 left-0 w-full h-screen z-50 flex flex-col items-start gap-6 p-6 transition-transform duration-300 ${
          isDark ? "bg-black text-white" : "bg-white text-gray-700"
        } `}
      >
        {menuLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            onClick={() => setOpen(false)}
            className={`text-base font-medium ${
              location.pathname === link.path
                ? "text-primary font-semibold"
                : ""
            }`}
          >
            {link.name}
          </Link>
        ))}

        {user?.role === "Owner" && (
          <button
            onClick={() => {
              navigate("/owner");
              setOpen(false);
            }}
            className="w-full border py-2 rounded-full"
          >
            Dashboard
          </button>
        )}
        <AnimatePresence mode="wait">
          {!user ? (
            <motion.button
              key="loginButton"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.6, damping: 20 }}
              onClick={() => {
                handleLogIn();
                setOpen(false);
              }}
              className="w-full bg-primary hover:bg-primarydull text-white py-2 rounded-lg"
            >
              LogIn
            </motion.button>
          ) : (
            <button
              onClick={() => {
                handleLogOut();
                setOpen(false);
              }}
              className="w-full border border-gray-300 py-2 rounded-lg"
            >
              LogOut
            </button>
          )}
        </AnimatePresence>

        {/* Mobile Theme Switch */}
        <div className="flex items-center mt-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-slate-500 transition-all duration-300" />
            <span className="dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-6" />
          </label>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
