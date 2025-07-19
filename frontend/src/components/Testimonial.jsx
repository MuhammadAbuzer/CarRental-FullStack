import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { assets } from "../assets/assets";
import { ThemeContext } from "../context/ToggleThemeContext";
import { motion } from "motion/react";

const testimonials = [
  {
    name: "Abuzer",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Booked a luxury sedan for my weekend trip — the car was clean, well-maintained, and the pickup process was super smooth. Highly recommend this service!",
  },
  {
    name: "Sara Khan",
    role: "Digital Nomad",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Absolutely loved the convenience. Booked online, picked up in minutes, and dropped it off without any hassle. The car was just perfect for my Himachal trip!",
  },
  {
    name: "Abdurrehman",
    role: "Frequent Traveler",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "I rent cars regularly for business travel — this platform always provides clean, new models at great prices. 5 stars for their reliability and support!",
  },
  {
    name: "Aliza",
    role: "Event Planner",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    review:
      "We booked an SUV for a wedding function and it was exactly what we needed — comfortable, stylish, and spacious. Everyone loved the ride!",
  },
  {
    name: "Haider shah",
    role: "Startup Founder",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    review:
      "The user experience was seamless. Found a BMW at the last minute for a pitch meeting. Car was spotless and made the right impression.",
  },
];

const TestimonialCard = ({ image, name, role, review }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`text-sm w-full sm:w-80 border pb-6 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
        isDark
          ? "bg-[#1f1f1f] border-gray-700 text-gray-200"
          : "bg-white border-gray-300 text-gray-800"
      }`}
    >
      <div className="flex items-center gap-4 px-5 py-4">
        <img className="h-12 w-12 rounded-full" src={image} alt={name} />
        <div>
          <h1 className="text-lg font-medium">{name}</h1>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      <div className="p-5 pb-7">
        <div className="flex gap-0.5">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" />
            ))}
        </div>
        <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
          {review}
        </p>
      </div>
    </div>
  );
};

const Testimonial = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`py-12 px-4 transition-all duration-300 ${
        isDark ? "bg-black text-white" : "bg-light text-gray-800"
      }`}
    >
      <motion.h2
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, damping: 20, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center text-3xl font-bold mb-10"
      >
        What Our Customers Say
      </motion.h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="max-w-6xl mx-auto"
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              <TestimonialCard {...t} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
