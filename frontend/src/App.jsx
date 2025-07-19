import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, useLocation, Route } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBookings from "./components/MyBookings";
import Layout from "./pages/owner/Layout";
import AddCar from "./pages/owner/AddCar";
import ManageBooking from "./pages/owner/ManageBooking";
import Dashboard from "./components/owner/Dashboard";
import ManageCars from "./pages/owner/ManageCars";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { fetchingCars } from "./Redux/Features/CarSlice";
import { useDispatch } from "react-redux";
import { fetchingUserInfo } from "./Redux/Features/UserInfoSlice";
import UserBooking from "./components/UserBooking";
import PrivateRoutes from "./components/PrivateRoutes";
import Footer from "./components/Footer";
import { ThemeContext } from "./context/ToggleThemeContext";
import EditCar from "./pages/owner/EditCar";

const App = () => {
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const isOwner = useLocation().pathname.startsWith("/owner");

  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(fetchingCars());
    dispatch(fetchingUserInfo());
  }, [dispatch]);

  return (
    <>
      <div className={`${theme === "dark" ? "bg-black text-white" : ""}`}>
        <Toaster />
        {showLogin && <Login setShowLogin={setShowLogin} />}
        {!isOwner && <Navbar setShowLogin={setShowLogin} />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/user-booking" element={<UserBooking />} />

          <Route
            path="/car-details/:id"
            element={
              <PrivateRoutes setShowLogin={setShowLogin}>
                <CarDetails />
              </PrivateRoutes>
            }
          />

          <Route
            path="/owner"
            element={
              <PrivateRoutes requiredRole="Owner">
                <Layout />
              </PrivateRoutes>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="add-car" element={<AddCar />} />
            <Route path="manage-cars" element={<ManageCars />} />
            <Route path="manage-bookings" element={<ManageBooking />} />
            <Route path="edit-car/:id" element={<EditCar />} />
          </Route>
        </Routes>

        {!isOwner && <Footer />}
      </div>
    </>
  );
};

export default App;
