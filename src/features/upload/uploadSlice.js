import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk("upload/images",async(data,thunkAPI)=>{
  try{
    return await uploadService.uploadImg(data)
}catch(error)
{
    return thunkAPI.rejectWithValue(error)
}
})

export const delImg = createAsyncThunk(
    "delete/images",
    async (id, thunkAPI) => {
      try {
        return await uploadService.deleteImg(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  const initialState = {
    images: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };
  export const uploadSlice = createSlice({
    name: "images",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(uploadImg.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(uploadImg.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.imageCreated = action.payload;
        })
        .addCase(uploadImg.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(delImg.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(delImg.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.images = [];
        })
        .addCase(delImg.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload;
        });
    },
  });
  export default uploadSlice.reducer;