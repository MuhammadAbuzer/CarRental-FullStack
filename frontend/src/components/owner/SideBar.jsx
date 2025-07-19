import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { ThemeContext } from "../../context/ToggleThemeContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { fetchingUserInfo } from "../../Redux/Features/UserInfoSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  const [uploading, setUploading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axios.post(
        "http://localhost:3000/api/owner/updating-image",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(fetchingUserInfo());
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      toast.error("Upload error");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center pt-8 w-full md:w-60 border-r text-sm transition-colors duration-300 ${
        isDark
          ? "bg-black text-white border-gray-700"
          : "bg-white text-gray-800 border-borderColor"
      }`}
    >
      {/* Profile Image */}
      <div className="group relative">
        <label htmlFor="image" className="cursor-pointer">
          <img
            src={
              user?.image ||
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/50 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="Edit" />
          </div>
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {uploading && <p className="text-xs mt-2">Uploading...</p>}

      <p className="mt-2 text-base text-center break-words">{user?.name}</p>

      <div className="w-full px-2">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end={link.path === "/owner"}
            className={({ isActive }) =>
              `relative flex items-center gap-3 w-full py-3 px-4 first:mt-6 rounded transition-all duration-200 ${
                isActive
                  ? isDark
                    ? "bg-primary/20 text-primary"
                    : "bg-primary/10 text-primary"
                  : isDark
                  ? "text-white hover:bg-gray-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? link.coloredIcon : link.icon}
                  alt={`${link.name} icon`}
                  className="w-5 h-5"
                />
                <span className="text-sm break-words">{link.name}</span>
                {isActive && (
                  <div className="bg-primary w-1.5 h-8 rounded-l absolute right-0" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
