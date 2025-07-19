import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URI;

export const LogOut = createAsyncThunk(
  "logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get("/api/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch({ type: "user/setUser", payload: null });
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
