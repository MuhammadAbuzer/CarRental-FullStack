import { configureStore } from "@reduxjs/toolkit";

import CarReducer from "./Features/CarSlice";
import UserReducer from "./Features/UserInfoSlice";
import BookingReducer from "./Features/BookingSlice";
import AdminReducer from "./Features/AdminStatsSlice";
const store = configureStore({
  reducer: {
    car: CarReducer,
    userInfo: UserReducer,
    bookings: BookingReducer,
    dashboardData: AdminReducer,
  },
});

export default store;
