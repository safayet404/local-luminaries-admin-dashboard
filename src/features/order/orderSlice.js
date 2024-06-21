import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { orderService } from "./orderService";


export const createOrder = createAsyncThunk("order/create-order",async(order,thunkAPI)=>{
  try{
    return await orderService.createOrder(order)
  }catch(error)
  {
    return thunkAPI.rejectWithValue(error)
  }
})
export const getAllOrder = createAsyncThunk("order/get-all-orders",async(thunkAPI)=>{
    try {
        return await orderService.getAllOrder()
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error) 
    }
})
export const getSingleOrder = createAsyncThunk(
    "order/get-order",
    async (id, thunkAPI) => {
      try {
        return await orderService.getSingleOrder(id)
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const updateOrder = createAsyncThunk("order/update-order",async(order,thunkAPI)=>{
  try{

    return await orderService.updateOrder(order)
  }catch(error)
  {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteOrder = createAsyncThunk("order/delete-order",async(id,thunkAPI)=>{
  try{
    return await orderService.deleteOrder(id)
  }catch(error)
  {
    return thunkAPI.rejectWithValue(error)
  }
})
const initialState = {
   
    orders : [],
    singleOrder : [],
    isError : false,
    isLoading : false,
    isSuccess : false,
    message : ""
}

export const orderSlice = createSlice({
    name : "order",
    initialState,
    reducers :{},
    extraReducers : (builder) =>{
        builder
          .addCase(getAllOrder.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getAllOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.orders = action.payload;
          })
          .addCase(getAllOrder.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
          })
          .addCase(getSingleOrder.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getSingleOrder.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.singleOrder = action.payload;
            state.message = "success";
          })
          .addCase(getSingleOrder.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })
          .addCase(createOrder.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createOrder.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.createdOrder = action.payload;
            state.message = "success";
          })
          .addCase(createOrder.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })
          .addCase(updateOrder.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateOrder.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.updatedOrder = action.payload;
            state.message = "success";
          })
          .addCase(updateOrder.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })
          .addCase(deleteOrder.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteOrder.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.deletedOrder = action.payload;
            state.message = "success";
          })
          .addCase(deleteOrder.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })
    }
})

export default orderSlice.reducer