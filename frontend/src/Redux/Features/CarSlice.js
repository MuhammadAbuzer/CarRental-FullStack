import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URI;

const initialState = {
  cars: [],
  loading: true,
  singleCar: null,
  loadingSingleCar: false,
  searchedCars: [],
  searchedCarsLoading: false,
};

export const fetchingCars = createAsyncThunk("car/fetchingCars", async () => {
  try {
    const res = await axios.get("/api/owner/get-all-cars", {
      withCredentials: true,
    });

    if (res.data.success) {
      return res.data.AllCars;
    } else {
      toast.error(res.data.message);
      return [];
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch Cars");
    throw error;
  }
});

export const fetchingSingleCar = createAsyncThunk(
  "fetchingSingleCar",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/user/get-single-car/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        return res.data.singleCar;
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const message = error.reponse?.data?.message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deletingCarapi = createAsyncThunk(
  "deletingCarapi",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/owner/delete-car/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        return id;
      } else {
        toast.error(res.data.message);
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const togglingAvalability = createAsyncThunk(
  "togglingAvalability",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/owner/updating-availability/${id}`);

      console.log("Updatted avability", res.data.isAvailable);

      if (res.data.success) {
        toast.success(res.data.message);
        return { id: res.data.id, isAvailable: res.data.isAvailable };
      } else {
        toast.error(res.data.message);
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
export const searchingCars = createAsyncThunk(
  "searchingCars",
  async ({ model, brand, category }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/api/owner/search-car",
        { model, brand, category },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        return res.data.searched;
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updatingCar = createAsyncThunk(
  "updatingCar",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/owner/update-car/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        return { id, updatedCar: res.data.updatedCar };
      }
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const CarSlice = createSlice({
  name: "Car",
  initialState,
  reducers: {
    setcar: (state, action) => {
      state.cars = action.payload;
    },
    setSingleCar: (state, action) => {
      state.singleCar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchingCars.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchingCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchingCars.rejected, (state, action) => {
        state.loading = false;
        state.cars = [];
      })
      .addCase(fetchingSingleCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchingSingleCar.fulfilled, (state, action) => {
        state.singleCar = action.payload;
        state.loading = false;
      })
      .addCase(fetchingSingleCar.rejected, (state, action) => {
        state.singleCar = null;
        state.loading = false;
      })
      .addCase(deletingCarapi.fulfilled, (state, action) => {
        state.cars = state.cars.filter((car) => car._id !== action.payload);
      })
      .addCase(togglingAvalability.fulfilled, (state, action) => {
        const { id, isAvailable } = action.payload;
        state.cars = state.cars.map((car) =>
          car._id === id ? { ...car, isAvailable } : car
        );
      })
      .addCase(updatingCar.pending, (state) => {
        state.loadingSingleCar = true;
      })
      .addCase(updatingCar.fulfilled, (state, action) => {
        state.loadingSingleCar = false;
        const { id, updatedCar } = action.payload;
        state.cars = state.cars.map((car) =>
          car._id === id ? action.payload.updatedCar : car
        );
      })
      .addCase(searchingCars.pending, (state) => {
        state.searchedCarsLoading = true;
      })
      .addCase(searchingCars.fulfilled, (state, action) => {
        state.searchedCarsLoading = false;
        state.searchedCars = action.payload;
      })
      .addCase(searchingCars.rejected, (state) => {
        state.searchedCarsLoading = false;
      });
  },
});

export const { setcar, setSingleCar } = CarSlice.actions;

export default CarSlice.reducer;
