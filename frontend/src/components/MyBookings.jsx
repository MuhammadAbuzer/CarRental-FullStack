import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { fetchingMyBookings } from "../Redux/Features/BookingSlice";
import { ThemeContext } from "../context/ToggleThemeContext";

const MyBookings = () => {
  const dispatch = useDispatch();
  const { myBookings } = useSelector((state) => state.bookings);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(fetchingMyBookings());
  }, [dispatch]);

  return (
    <div
      className={`px-6 mb-4 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl mx-auto transition-colors duration-300 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Title
        title="My Bookings"
        subtitle="View and manage your all car bookings"
        align="left"
      />

      <div className="space-y-8 mt-12">
        {myBookings &&
          myBookings.map((booking, index) => (
            <div
              key={booking._id}
              className={`grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border rounded-lg shadow-sm transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-neutral-900 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Car Info */}
              <div className="md:col-span-1">
                <div className="rounded-md overflow-hidden">
                  <img
                    src={booking.car.image}
                    alt={`${booking.car.brand} ${booking.car.model}`}
                    className="w-full h-auto aspect-video object-cover"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-base font-semibold">
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {booking.car.year} • {booking.car.category} •{" "}
                    {booking.car.location}
                  </p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="md:col-span-3 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`text-sm font-medium px-3 py-1.5 rounded ${
                      theme === "dark"
                        ? "text-gray-300 bg-gray-800"
                        : "text-gray-600 bg-gray-100"
                    }`}
                  >
                    Booking #{index + 1}
                  </span>
                  <span
                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                      booking.status === "confirmed"
                        ? theme === "dark"
                          ? "bg-green-900 text-green-300"
                          : "bg-green-100 text-green-700"
                        : theme === "dark"
                        ? "bg-red-900 text-red-300"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Rental Period */}
                  <div className="flex items-start gap-2">
                    <img
                      src={assets.calendar_icon_colored}
                      alt="calendar"
                      className="w-5 h-5 mt-1"
                    />
                    <div>
                      <p
                        className={`text-xs mb-1 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Rental Period
                      </p>
                      <p className="text-sm font-medium">
                        {booking.pickupDate.split("T")[0]} —{" "}
                        {booking.returnDate.split("T")[0]}
                      </p>
                    </div>
                  </div>

                  {/* Pick-up Location */}
                  <div className="flex items-start gap-2">
                    <img
                      src={assets.location_icon_colored}
                      alt="location"
                      className="w-5 h-5 mt-1"
                    />
                    <div>
                      <p
                        className={`text-xs mb-1 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Pick-up Location
                      </p>
                      <p className="text-sm font-medium">
                        {booking.car.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total Price */}
                <div
                  className={`mt-4 text-right text-sm font-medium ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Total Price:{" "}
                  <span className="text-primary font-semibold">
                    ${booking.price}
                  </span>
                  <div
                    className={`text-xs mt-1 ${
                      theme === "dark" ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Booked On {booking.createdAt.split("T")[0]}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyBookings;
