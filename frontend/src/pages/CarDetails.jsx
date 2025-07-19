import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useContext,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchingSingleCar } from "../Redux/Features/CarSlice";
import { SyncLoader } from "react-spinners";
import {
  getConflictingBookings,
  SubmittingBookingForm,
} from "../Redux/Features/BookingSlice";
import { ThemeContext } from "../context/ToggleThemeContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CarDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const { SubmittingBookingFormLoading } = useSelector(
    (state) => state.bookings
  );

  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const carData = useSelector((state) => state.car.singleCar);
  const loading = useSelector((state) => state.car.loading);
  const currency = import.meta.env.VITE_CURRENCY;

  const imageContainerRef = useRef(null);
  const [imageHeight, setImageHeight] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    dispatch(fetchingSingleCar(id));
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  useLayoutEffect(() => {
    if (imageContainerRef.current) {
      setImageHeight(imageContainerRef.current.offsetHeight);
    }
  }, [carData]);

  if (loading || !carData)
    return (
      <div className="p-8 text-center">
        <SyncLoader />
      </div>
    );

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!pickupDate || !returnDate)
      return toast.error("Please select both dates");

    if (pickupDate === returnDate)
      return toast.error("Car must be booked for at least one day");

    if (pickupDate > returnDate) return toast.error("Invalid date selection");

    const allDays = [];
    let current = new Date(pickupDate);
    const end = new Date(returnDate);

    while (current <= end) {
      allDays.push(new Date(current).toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }

    let res;
    try {
      res = await dispatch(
        getConflictingBookings({ carId: carData._id, pickupDate, returnDate })
      ).unwrap();
    } catch (error) {
      return toast.error("Failed to check availability");
    }

    const blockedDays = [];
    res.forEach((booking) => {
      let current = new Date(booking.pickupDate);
      const end = new Date(booking.returnDate);
      while (current <= end) {
        blockedDays.push(new Date(current).toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
      }
    });

    const availableDays = allDays.filter((day) => !blockedDays.includes(day));

    if (availableDays.length === 0) {
      return toast.error(
        "❌ This car is not available in your selected range."
      );
    }

    if (availableDays.length < allDays.length) {
      const msg = `⚠️ Only the following ${
        availableDays.length
      } day(s) are available:\n\n${availableDays.join(
        ", "
      )}\n\nDo you still want to book for this limited availability?`;

      const proceed = window.confirm(msg);
      if (!proceed) return;
    }

    dispatch(
      SubmittingBookingForm({
        car: carData._id,
        pickupDate: new Date(pickupDate).toISOString(),
        returnDate: new Date(returnDate).toISOString(),
        availableDays,
      })
    );
  };

  return (
    <motion.div
      className={`flex flex-col lg:flex-row px-6 md:mx-16 justify-between mt-9 transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.3, delayChildren: 0.2 }}
    >
      <motion.div
        className="w-full max-w-[600px]"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <button
          onClick={() => navigate("/")}
          className={`flex items-center gap-2 my-2 font-medium ${
            isDark ? "text-blue-400" : "text-primary"
          }`}
        >
          <FaLongArrowAltLeft />
          Back to All cars
        </button>

        <div
          className="w-full aspect-video rounded-lg overflow-hidden"
          ref={imageContainerRef}
        >
          <img
            src={carData.image}
            alt={carData.name || "Car"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="font-bold text-2xl py-2">
          {carData.brand} {carData.model}
        </div>
        <div className="text-gray-400 py-2 text-sm">
          {carData.year} - {carData.category}
        </div>

        <hr className={`py-2 ${isDark ? "border-gray-700" : ""}`} />

        <div className="grid grid-cols-2 mb-3 md:grid-cols-4 gap-3">
          {[
            {
              icon: assets.users_icon,
              label: `${carData.seating_capacity} seats`,
            },
            {
              icon: assets.fuel_icon,
              label: carData.fuel_type,
            },
            {
              icon: assets.car_icon,
              label: carData.transmission,
            },
            {
              icon: assets.location_icon,
              label: carData.location,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, delay: i * 0.1 },
                },
              }}
              className={`rounded-lg flex flex-col items-center justify-center h-[80px] ${
                isDark ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              <img className="w-5 h-5" src={item.icon} alt="" />
              <div>{item.label}</div>
            </motion.div>
          ))}
        </div>

        <div>
          <h1 className="font-semibold text-lg">Description</h1>
          <p
            className={`text-[15px] py-2 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {carData.description}
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, delay: 0.6 },
          },
        }}
        className={`lg:mx-5 rounded-2xl overflow-x-hidden shadow-2xl lg:max-w-[350px] w-full mt-6 ${
          isDark ? "bg-gray-900 text-white" : "bg-white"
        }`}
        style={{
          height:
            imageHeight && window.innerWidth >= 1024
              ? `${imageHeight}px`
              : "auto",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div className="p-6 flex flex-col justify-evenly h-full">
          <div className="flex justify-between items-center mb-4">
            <div className="font-semibold text-xl">
              {currency}
              {carData.pricePerDay}
            </div>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Per Day
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4 ">
            <div className="flex flex-col  gap-1">
              <label
                htmlFor="pick-up"
                className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Pick-Up Date
              </label>
              <input
                value={pickupDate || ""}
                onChange={(e) => setPickupDate(e.target.value)}
                id="pick-up"
                type="date"
                min={today}
                required
                className={`rounded-lg px-3 py-2 outline-none text-sm border w-full ${
                  isDark
                    ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    : "bg-white border-gray-300 text-black"
                } focus:ring-2 focus:ring-primary`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="return"
                className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Return Date
              </label>
              <input
                value={returnDate || ""}
                onChange={(e) => setReturnDate(e.target.value)}
                id="return"
                type="date"
                required
                min={today}
                className={`rounded-lg px-3 py-2 outline-none text-sm border w-full ${
                  isDark
                    ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    : "bg-white border-gray-300 text-black"
                } focus:ring-2 focus:ring-primary`}
              />
            </div>

            <button
              type="submit"
              disabled={!carData.isAvailable || SubmittingBookingFormLoading}
              className={`w-full py-2 rounded-lg text-sm font-semibold transition-all ${
                carData.isAvailable
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-gray-300 text-gray-400 cursor-not-allowed"
              }`}
            >
              {SubmittingBookingFormLoading ? "Booking..." : "Book Now"}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CarDetails;
