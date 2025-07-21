import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TokenContext } from "../../context/Token";
import { useContext } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URI;

const initialState = {
  myBookings: [],
  loading: true,
  availableCars: [],
  AllBookings: [],
  SubmittingBookingFormLoading: false,
  togglingStatusLoading: false,
  singleBooking: [],
};
export const SubmittingBookingForm = createAsyncThunk(
  "SubmittingBookingForm",
  async (
    { car, pickupDate, returnDate, availableDays },
    { rejectWithValue }
  ) => {
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      const res = await axios.post(
        "/api/owner/create-booking",
        {
          car,
          pickupDate: new Date(pickupDate).toISOString(),
          returnDate: new Date(returnDate).toISOString(),
          availableDays,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        return toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchingMyBookings = createAsyncThunk(
  "fetchingMyBookings",
  async (_, { rejectWithValue }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const res = await axios.get("/api/owner/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        return res.data.myBookings;
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchingAvailableCars = createAsyncThunk(
  "fetchingAvailableCars",
  async ({ location, pickupDate, returnDate }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/api/owner/checking-availability",
        { location, pickupDate, returnDate },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        return res.data.availableCars;
      } else {
        toast.error(res.data.message);
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchingAllBookings = createAsyncThunk(
  "fetchingAllBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/owner/get-all-bookings", {
        withCredentials: true,
      });
      if (res.data.success) {
        return res.data.AllBookings;
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const togglingStatus = createAsyncThunk(
  "booking/togglingStatus",
  async ({ id, newStatus }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `/api/owner/updating-status/${id}`,
        { newStatus },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        return { id, newStatus };
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getConflictingBookings = createAsyncThunk(
  "getConflictingBookings",
  async ({ carId, pickupDate, returnDate }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/api/owner/booking-conflicts",
        {
          carId,
          pickupDate,
          returnDate,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        return res.data.bookings;
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const singleBookingDetails = createAsyncThunk(
  "singleBookingDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/owner/single-booking/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        return res.data.singleBooking;
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
const BookingSlice = createSlice({
  name: "Booking",
  initialState,
  reducers: {
    setMyBookings: (state, action) => {
      state.myBookings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchingMyBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchingMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.myBookings = action.payload;
      })
      .addCase(fetchingMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.myBookings = null;
      })
      .addCase(fetchingAvailableCars.pending, (state) => {
        state.togglingStatusLoading = true;
      })
      .addCase(fetchingAvailableCars.fulfilled, (state, action) => {
        state.togglingStatusLoading = false;
        state.availableCars = action.payload;
      })
      .addCase(fetchingAvailableCars.rejected, (state) => {
        state.togglingStatusLoading = false;
        state.availableCars = false;
      })
      .addCase(fetchingAllBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchingAllBookings.fulfilled, (state, action) => {
        state.AllBookings = action.payload;
        state.loading = false;
      })
      .addCase(togglingStatus.pending, (state) => {
        state.togglingStatusLoading = true;
      })
      .addCase(togglingStatus.fulfilled, (state, action) => {
        state.togglingStatusLoading = false;
        const { id, newStatus } = action.payload;
        state.AllBookings = state.AllBookings.map((car) =>
          car._id === id ? { ...car, status: newStatus } : car
        );
      })
      .addCase(togglingStatus.rejected, (state) => {
        state.togglingStatusLoading = false;
      })
      .addCase(SubmittingBookingForm.pending, (state) => {
        state.SubmittingBookingFormLoading = true;
      })
      .addCase(SubmittingBookingForm.fulfilled, (state) => {
        state.SubmittingBookingFormLoading = false;
      })
      .addCase(SubmittingBookingForm.rejected, (state) => {
        state.SubmittingBookingFormLoading = false;
      })
      .addCase(singleBookingDetails.pending, (state) => {
        state.togglingStatusLoading = true;
      })
      .addCase(singleBookingDetails.fulfilled, (state, action) => {
        state.singleBooking = action.payload;
        state.togglingStatusLoading = false;
      })
      .addCase(singleBookingDetails.rejected, (state) => {
        state.togglingStatusLoading = false;
        state.singleBooking = [];
      });
  },
});

export const { setMyBookings } = BookingSlice.actions;

export default BookingSlice.reducer;
