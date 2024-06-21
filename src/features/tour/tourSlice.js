import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import tourService from "./tourService"
import toast from "react-hot-toast";

export const getTours = createAsyncThunk(
  "tour/all-tour",
  async (thunkAPI) => {
    try {
      console.log("its coming here 1")
      return await tourService.getTours();
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
  
);
export const createTour = createAsyncThunk(
  "tour/create-tour",
  async (tourData, thunkAPI) => {
    try {
      return await tourService.createTour(tourData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteTour = createAsyncThunk(
  "tour/delete-tour",
  async (id, thunkAPI) => {
    try {
      return await tourService.deleteTour(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateTour = createAsyncThunk(
  "tour/update-tour",
  async (tour, thunkAPI) => {
    try {
      return await tourService.updateTour(tour)
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleTour = createAsyncThunk(
  "tour/get-single-tour",
  async (id, thunkAPI) => {
    try {
      return await tourService.getSingleTour(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  tours: [],
  singleTour : [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  createStatus: null,
  message: "",
};
export const resetState = createAction("Reset_all");
export const tourSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTours.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTours.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.tours = action.payload;
      })
      .addCase(getTours.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdTour = action.payload;
      })
      .addCase(createTour.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedTour = action.payload
       
      })
      .addCase(deleteTour.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSingleTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleTour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleTour = action.payload
       
      })
      .addCase(getSingleTour.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedTour = action.payload
       
      })
      .addCase(updateTour.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default tourSlice.reducer;
