import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../context/ToggleThemeContext";

const NavbarOwner = () => {
  const { user } = useSelector((state) => state.userInfo);

  const { theme } = useContext(ThemeContext);
  return (
    <div className="flex items-center justify-between gap-4 px-4  py-4 text-gray-500 md:px-10 border-b border-borderColor transition-all text-sm md:text-base">
      <Link to="/" className="flex items-center gap-2">
        <img src={assets.logo} alt="Logo" className="h-6 md:h-7" />
      </Link>

      <div>
        Welcome{" "}
        <span
          className={`font-semibold text-base text-black ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {user.name}
        </span>
        , <span className="capitalize">{user.role}</span>
      </div>
    </div>
  );
};

export default NavbarOwner;
