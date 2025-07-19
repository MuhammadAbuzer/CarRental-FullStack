import React, { useEffect, useContext } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
  deletingCarapi,
  fetchingCars,
  togglingAvalability,
} from "../../Redux/Features/CarSlice";
import { SyncLoader } from "react-spinners";
import { ThemeContext } from "../../context/ToggleThemeContext";

const ManageCars = () => {
  const dispatch = useDispatch();
  const { cars: reduxcars, loading } = useSelector((state) => state.car);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchingCars());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (!loading) {
      dispatch(deletingCarapi(id));
    }
  };

  const toggleAvailability = (id) => {
    if (!loading) {
      dispatch(togglingAvalability(id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/owner/edit-car/${id}`);
  };

  return (
    <div
      className={`px-4 pt-10 md:px-10 w-full transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform."
      />

      <div
        className={`max-w-3xl w-full rounded-md overflow-hidden mt-6 border ${
          isDark ? "border-gray-700" : "border-borderColor"
        }`}
      >
        {loading ? (
          <div className="flex justify-center items-center p-6">
            <SyncLoader color="#2563eb" size={12} />
          </div>
        ) : reduxcars.length === 0 ? (
          <p className="text-center p-6 text-gray-500">No cars found.</p>
        ) : (
          <table
            className={`w-full border-collapse text-left text-sm ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <thead className={`${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
              <tr>
                <th className="p-3 font-medium">Car</th>
                <th className="p-3 font-medium max-md:hidden">Category</th>
                <th className="p-3 font-medium">Price</th>
                <th className="p-3 font-medium max-md:hidden">Status</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {reduxcars.map((car) => (
                <tr
                  key={car._id}
                  className={`border-t ${
                    isDark ? "border-gray-700" : "border-borderColor"
                  }`}
                >
                  {/* Car Column */}
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src={car.image}
                      alt="car"
                      className="h-12 w-12 aspect-square rounded-md object-cover"
                    />
                    <div className="max-md:hidden">
                      <p className="font-medium">
                        {car.brand} {car.model}
                      </p>
                      <p
                        className={`text-xs ${
                          isDark ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {car.seating_capacity} • {car.transmission}
                      </p>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-3 max-md:hidden">{car.category}</td>

                  {/* Price */}
                  <td className="p-3">{`$${car.pricePerDay}/day`}</td>

                  {/* Availability */}
                  <td className="p-3 max-md:hidden">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        car.isAvailable
                          ? isDark
                            ? "bg-green-900 text-green-300"
                            : "bg-green-100 text-green-600"
                          : isDark
                          ? "bg-red-900 text-red-300"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {car.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="flex items-center p-3 gap-3">
                    <img
                      onClick={() => toggleAvailability(car._id)}
                      src={
                        car.isAvailable
                          ? assets.eye_icon
                          : assets.eye_close_icon
                      }
                      alt="toggle"
                      className={`cursor-pointer  w-11 h-11 ${
                        isDark ? "bg-white rounded-lg" : ""
                      }`}
                    />
                    <img
                      onClick={() => handleDelete(car._id)}
                      src={assets.delete_icon}
                      alt="delete"
                      className={`cursor-pointer  w-11 h-11 ${
                        isDark ? "bg-white rounded-lg" : ""
                      }`}
                    />
                    <div
                      className={`${
                        isDark
                          ? "bg-white rounded-lg h-11 w-11 flex items-center justify-center"
                          : ""
                      }`}
                    >
                      <FaEdit
                        onClick={() => handleEdit(car._id)}
                        className={`cursor-pointer ${
                          isDark
                            ? "text-black text-xl"
                            : "text-gray-600 text-base"
                        }`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageCars;
