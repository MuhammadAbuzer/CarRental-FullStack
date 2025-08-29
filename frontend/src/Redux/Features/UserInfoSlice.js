import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { TokenContext } from "../../context/Token";
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URI;
const initialState = {
  user: null,
  loading: true,
  loginLoading: false,
  token: JSON.parse(localStorage.getItem("token")) || null,
};

export const LogIn = createAsyncThunk(
  "login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/api/user/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        return { user: res.data.user, token: res.data.token };
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
export const Register = createAsyncThunk(
  "register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/api/user/register",
        { name, email, password },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        return { user: res.data.user, token: res.data.token };
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

export const fetchingUserInfo = createAsyncThunk(
  "user/fetchingUserInfo",
  async (_, { rejectWithValue }) => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token || token === "null" || token === "undefined") {
      return rejectWithValue("No token found");
    }

    try {
      const res = await axios.get("/api/user/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        return res.data.user;
      } else {
        // toast.error(res.data.message);
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchingUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchingUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchingUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(LogIn.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(LogIn.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(LogIn.rejected, (state) => {
        state.loginLoading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(Register.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginLoading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(Register.rejected, (state) => {
        state.user = null;
        state.loginLoading = false;
        state.token = null;
      });
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
