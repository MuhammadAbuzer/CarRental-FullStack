import React, { useContext } from "react";
import Hero from "../components/Hero";
import FeaturedSection from "../components/FeaturedSection";
import Banner from "../components/Banner";
import Testimonial from "../components/Testimonial";
import NewsLetter from "../components/NewsLetter";
import { ThemeContext } from "../context/ToggleThemeContext";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={` ${theme === "dark" ? "bg-black text-white" : ""}`}>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testimonial />
      <NewsLetter />
    </div>
  );
};

export default Home;
