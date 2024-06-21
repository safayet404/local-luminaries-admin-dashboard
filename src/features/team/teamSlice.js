import { createSlice,createAsyncThunk,createAction} from "@reduxjs/toolkit";
import teamService from "./teamService";

export const getAllTeam = createAsyncThunk ("team/all-team",async(thunkAPI)=>{
    try{

        return await teamService.getTeam()

    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getSingleTeam = createAsyncThunk ("team/get-single-team",async(id,thunkAPI)=>{
    try{

        return await teamService.getSingleTeam(id)

    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const createTeam = createAsyncThunk ("team/create-team",async(team,thunkAPI)=>{
    try{

        return await teamService.createTeam(team)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const updateTeam = createAsyncThunk ("team/update-team",async(team,thunkAPI)=>{
    try{

        return await teamService.updateTeam(team)

    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deleteTeam = createAsyncThunk ("team/delete-team",async(id,thunkAPI)=>{
    try{

        return await teamService.deleteTeam(id)

    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState = {
    teams : [],
    singleTeam : [],
    isError : false,
    isLoading : false,
    isSuccess : false,
    message : "",
}
export const resetState = createAction("Reset_all");

export const teamSlice = createSlice( {
    name : "team",
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder
        .addCase(getAllTeam.pending, (state)=>{
            state.isLoading = true
        }).addCase(getAllTeam.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.teams = action.payload
        }).addCase(getAllTeam.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(createTeam.pending, (state)=>{
            state.isLoading = true
        }).addCase(createTeam.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.createdTeam = action.payload
        }).addCase(createTeam.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getSingleTeam.pending, (state)=>{
            state.isLoading = true
        }).addCase(getSingleTeam.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.singleTeam = action.payload
          
        }).addCase(getSingleTeam.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        }) 
        .addCase(updateTeam.pending, (state)=>{
            state.isLoading = true
        }).addCase(updateTeam.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.updatedTeam = action.payload
          
        }).addCase(updateTeam.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        }) 
        .addCase(deleteTeam.pending, (state)=>{
            state.isLoading = true
        }).addCase(deleteTeam.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.deletedTeam = action.payload
          
        }).addCase(deleteTeam.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        }) 
        
        .addCase(resetState, () => initialState);
       
    }
})

export default teamSlice.reducer