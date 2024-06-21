import { createAsyncThunk,createSlice,createAction } from "@reduxjs/toolkit";

import activityService from "./activityService";

export const getActivities = createAsyncThunk("activity/all-activity",async(thunkAPI)=>{

    try{
        return await activityService.getActivities()

    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }

})

export const createActivity= createAsyncThunk("activity/create-activity",async(activity,thunkAPI)=>{
    try{
        return await activityService.createActivity(activity)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getSingleActivity = createAsyncThunk("activity/get-single-activity",async(id,thunkAPI)=>{
    try{
        return await activityService.getSingleActivity(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const updateActivity= createAsyncThunk("activity/update-activity",async(activity,thunkAPI)=>{
    try{
        return await activityService.updateActivity(activity)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deleteActivity = createAsyncThunk("activity/delete-activity",async(id,thunkAPI)=>{
    try{
        return await activityService.deleteActivity(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState ={
    activities : [],
    singleActivity : [],
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ""
}
export const resetState = createAction("Reset_all");

export const activitySlice = createSlice({
    name : "Activity",
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder
        .addCase(getActivities.pending,(state)=>{
            state.isLoading = true
        }).addCase(getActivities.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.activities = action.payload
        }).addCase(getActivities.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(createActivity.pending,(state)=>{
            state.isLoading = true
        }).addCase(createActivity.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.createdActivity = action.payload
        }).addCase(createActivity.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getSingleActivity.pending,(state)=>{
            state.isLoading = true
        }).addCase(getSingleActivity.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.singleActivity = action.payload
        }).addCase(getSingleActivity.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateActivity.pending,(state)=>{
            state.isLoading = true
        }).addCase(updateActivity.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.updatedActivity = action.payload
        }).addCase(updateActivity.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(deleteActivity.pending,(state)=>{
            state.isLoading = true
        }).addCase(deleteActivity.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.deletedActivity = action.payload
        }).addCase(deleteActivity.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(resetState, () => initialState);
    }
})

export default activitySlice.reducer