import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import destinationService from "./destinationService";
import { message } from "antd";

export const getDestination = createAsyncThunk("destination/all-destination",async(thunkAPI)=>{
    try{
        return await destinationService.getDestination()
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createDestination = createAsyncThunk("destination/create-destination",async(destinationData,thunkAPI)=>{
    try{
        return await destinationService.createDestination(destinationData)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteDestination = createAsyncThunk("destination/delete-destination",async(id,thunkAPI)=>{
    try{
        return await destinationService.deleteDestination(id)
    }catch(error)
    {
        console.log(error)
        return thunkAPI.rejectWithValue(error)
    }
})

export const getSingleDestination = createAsyncThunk("destination/single-destination",async(id,thunkAPI)=>{
    try{
        return await destinationService.getSingleDestination(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateDestination = createAsyncThunk("destination/update-destination",async(destination,thunkAPI)=>{
    try{
        return await destinationService.updateDestination(destination)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState = {
    destinations : [],
    singleDestination  : [],
    isError : false,
    isLoading : false,
    isSuccess : false,
    createStatus : null,
    message : ""

}

export const resetState = createAction("Reset_all")
export const destinationSlice = createSlice({
    name : "destination",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getDestination.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(getDestination.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.destinations = action.payload
        })
        .addCase(getDestination.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(createDestination.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(createDestination.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.createdDestination = action.payload
        })
        .addCase(createDestination.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getSingleDestination.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(getSingleDestination.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.singleDestination = action.payload
        })
        .addCase(getSingleDestination.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(deleteDestination.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(deleteDestination.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.deletedDestination = action.payload
        })
        .addCase(deleteDestination.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateDestination.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(updateDestination.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.updatedDestination = action.payload
        })
        .addCase(updateDestination.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(resetState, ()=> initialState)
    }
})

export default destinationSlice.reducer