import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  adminStats: null,
  loading: true,
  addCarLoading: false,
};

export const fetchingAdminStats = createAsyncThunk(
  "fetchingAdminStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/owner/admin-Stats", {
        withCredentials: true,
      });

      if (res.data.success) {
        return res.data.stats;
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message;
      rejectWithValue(message);
      return toast.error(message);
    }
  }
);

export const AddingCar = createAsyncThunk(
  "car/AddingCar",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/owner/add-car", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return toast.success(res.data.message);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const AdminSlice = createSlice({
  name: "adminStats",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchingAdminStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchingAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.adminStats = action.payload;
      })
      .addCase(fetchingAdminStats.rejected, (state) => {
        state.loading = false;
        state.adminStats = null;
      })
      .addCase(AddingCar.pending, (state) => {
        state.addCarLoading = true;
      })
      .addCase(AddingCar.fulfilled, (state) => {
        state.addCarLoading = false;
      })
      .addCase(AddingCar.rejected, (state) => {
        state.addCarLoading = false;
      });
  },
});

export default AdminSlice.reducer;
