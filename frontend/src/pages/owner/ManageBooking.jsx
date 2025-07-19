import React, { useEffect, useContext, useState } from "react";
import Title from "../../components/owner/Title";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingAllBookings,
  singleBookingDetails,
  togglingStatus,
} from "../../Redux/Features/BookingSlice";
import { SyncLoader } from "react-spinners";
import { ThemeContext } from "../../context/ToggleThemeContext";

const ManageBooking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { AllBookings, loading, togglingStatusLoading } = useSelector(
    (state) => state.bookings
  );
  const { singleBooking } = useSelector((state) => state.bookings);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const currency = import.meta.env.VITE_CURRENCY || "$";

  useEffect(() => {
    dispatch(fetchingAllBookings());
  }, [dispatch]);

  const handleStatusChange = (id, newStatus) => {
    dispatch(togglingStatus({ id, newStatus }));
  };

  const handleBookingDetails = (id) => {
    dispatch(singleBookingDetails(id));
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-all"
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`bg-white rounded-xl shadow-2xl w-[90%] max-w-2xl h-[80vh] p-6 overflow-y-auto relative animate-fadeIn ${
              theme === "dark"
                ? "dark:bg-gray-900 text-white"
                : "bg-white text-black"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-lg font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-2 ">Car details</h2>
            <hr className="my-4  border-gray-300 " />
            {togglingStatusLoading ? (
              <div className="flex justify-center items-center p-6">
                <SyncLoader color="#2563eb" size={12} />
              </div>
            ) : (
              singleBooking && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <strong className=" font-semibold mb-0">Car Id:</strong>
                    <p className="text-sm mb-0">{singleBooking.car?._id}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <strong className=" font-semibold mb-0">Car Name:</strong>
                    <p className="text-sm mb-0">
                      {singleBooking.car?.brand} {singleBooking.car?.model}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <strong className=" font-semibold mb-0">
                      Car Category:
                    </strong>
                    <p className="text-sm mb-0">
                      {singleBooking.car?.category}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <strong className=" font-semibold mb-0">
                      Car Location:
                    </strong>
                    <p className="text-sm mb-0">
                      {singleBooking.car?.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <strong className=" font-semibold mb-0">
                      Car transmission:
                    </strong>
                    <p className="text-sm mb-0">
                      {singleBooking.car?.transmission}
                    </p>
                  </div>

                  <hr className="my-4  border-gray-300 " />
                  <h2 className="text-2xl font-bold mb-2 ">Booking details</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <strong className=" font-semibold mb-0">
                      Booking Id :
                    </strong>
                    <p className="text-sm mb-0">{singleBooking?._id}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <strong className=" font-semibold mb-0">
                      Booking date :
                    </strong>
                    <p className="text-sm mb-0">
                      {singleBooking?.createdAt.split("T")[0]}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <strong className=" font-semibold mb-0">
                      Booking Range :
                    </strong>
                    <p className="text-sm mb-0">
                      {singleBooking?.pickupDate.split("T")[0]} to{" "}
                      {singleBooking?.returnDate.split("T")[0]}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <strong className=" font-semibold mb-0">
                      Booking Status :
                    </strong>
                    <p
                      className={`text-sm mb-0 ${
                        singleBooking?.status === "pending"
                          ? "bg-yellow-400 text-white px-3 py-1 rounded-lg"
                          : ""
                      } ${
                        singleBooking?.status === "confirmed"
                          ? "bg-green-600 px-3 py-1 rounded-lg text-white"
                          : ""
                      } ${
                        singleBooking.status === "cancelled"
                          ? "bg-red-400 px-3 py-1 rounded-lg text-white"
                          : ""
                      }`}
                    >
                      {singleBooking?.status}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <strong className=" font-semibold mb-0">
                      Total price :
                    </strong>
                    <p className="text-sm mb-0">${singleBooking?.price}</p>
                  </div>
                  <hr className="my-4  border-gray-300 " />
                  <h2 className="text-2xl font-bold mb-2 ">User details</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <strong className=" font-semibold mb-0">User Name :</strong>
                    <p className="text-sm mb-0">{singleBooking?.user.name}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <strong className=" font-semibold mb-0">
                      User Email :
                    </strong>
                    <p className="text-sm mb-0">{singleBooking?.user.email}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <strong className=" font-semibold mb-0">Users Id :</strong>
                    <p className="text-sm mb-0">{singleBooking?.user._id}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <strong className=" font-semibold mb-0">
                      Users registerd At :
                    </strong>
                    <p className="text-sm mb-0">
                      {singleBooking?.user.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      <div
        className={`px-4 pt-10 md:px-10 w-full transition-colors duration-300 ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <Title
          title="Manage Bookings"
          subTitle="Track all customer bookings, update their status, or cancel reservations as needed."
        />

        <div
          className={`w-full rounded-md overflow-hidden mt-6 border ${
            isDark ? "border-gray-700" : "border-borderColor"
          }`}
        >
          {loading ? (
            <div className="flex justify-center p-6">
              <SyncLoader color="#2563eb" size={15} />
            </div>
          ) : AllBookings.length === 0 ? (
            <p className="text-center p-6 text-gray-500">No bookings found.</p>
          ) : (
            <div className="overflow-x-auto scrollbar-hide">
              <table
                className={`w-full min-w-[850px] border-collapse text-left text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <thead
                  className={`${isDark ? "bg-gray-800" : "bg-gray-50"} ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <tr>
                    <th className="p-3 font-medium">Car</th>
                    <th className="p-3 font-medium">Date Range</th>
                    <th className="p-3 font-medium">Total</th>
                    <th className="p-3 font-medium">Payment</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">More Info</th>
                  </tr>
                </thead>

                <tbody>
                  {AllBookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className={`border-t ${
                        isDark ? "border-gray-700" : "border-borderColor"
                      } ${
                        isDark ? "hover:bg-gray-800" : "hover:bg-gray-50"
                      } transition`}
                    >
                      <td className="p-3 flex items-center gap-3">
                        <img
                          src={booking.car.image}
                          alt={`${booking.car.brand} ${booking.car.model}`}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-medium">
                            {booking.car.brand} {booking.car.model}
                          </p>
                          <p className="text-xs text-gray-500">
                            {booking.car.transmission},{" "}
                            {booking.car.seating_capacity} Seats
                          </p>
                        </div>
                      </td>

                      <td className="p-3">
                        {new Date(booking.pickupDate).toLocaleDateString()} to{" "}
                        {new Date(booking.returnDate).toLocaleDateString()}
                      </td>

                      <td className="p-3">
                        {currency}
                        {booking.price}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100"
                          }`}
                        >
                          Offline
                        </span>
                      </td>

                      <td className="p-3">
                        {booking.status === "pending" ? (
                          <select
                            value={booking.status}
                            onChange={(e) =>
                              handleStatusChange(booking._id, e.target.value)
                            }
                            disabled={togglingStatusLoading}
                            className={`px-2 py-1.5 mt-1 rounded-md outline-none text-sm ${
                              isDark
                                ? "bg-gray-900 text-white border-gray-700"
                                : "bg-white text-gray-600 border-borderColor"
                            } border`}
                          >
                            {togglingStatusLoading ? (
                              <option>Updating Status...</option>
                            ) : (
                              <>
                                <option value="pending">Pending</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="confirmed">Confirmed</option>
                              </>
                            )}
                          </select>
                        ) : (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.status === "confirmed"
                                ? isDark
                                  ? "bg-green-900 text-green-300"
                                  : "bg-green-100 text-green-500"
                                : isDark
                                ? "bg-red-900 text-red-300"
                                : "bg-red-100 text-red-500"
                            }`}
                          >
                            {booking.status}
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setIsOpen(!isOpen);
                            handleBookingDetails(booking._id);
                          }}
                          className="px-3 py-1 bg-primary text-white rounded-lg"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageBooking;
