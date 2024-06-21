import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import cuponService from "./cuponService";

export const getCupons = createAsyncThunk("cupon/all-cupon",async(thunkAPI)=>{
    try{
        return await cuponService.getCupons()
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const createCupons = createAsyncThunk("cupon/create-cupon",async(cuponData,thunkAPI)=>{
    try{
        return await cuponService.createCupons(cuponData)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getACupon = createAsyncThunk("cupon/get-cupon",async(id,thunkAPI)=>{
    try{
        return await cuponService.getACupon(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const updateCupon = createAsyncThunk("cupon/update-cupon",async(cupon,thunkAPI)=>{
    try{
        return await cuponService.updateCupon(cupon)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deleteCupon = createAsyncThunk("cupon/delete-cupon",async(id,thunkAPI)=>{
    try{
        return await cuponService.deleteCupon(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const resetState = createAction("Reset_all");
const initialState = {
    cupons : [],
    isError : false,
    isLoading : false,
    isSuccess : false,
    message : ""
}

export const cuponSlice = createSlice({
    name : "cupons",
    initialState,
    reducers :{},
    extraReducers : (builder)=>{
        builder
        .addCase(getCupons.pending , (state)=>{
            state.isLoading = true
        }).addCase(getCupons.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.cupons = action.payload
        }).addCase(getCupons.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(createCupons.pending , (state)=>{
            state.isLoading = true
        }).addCase(createCupons.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.createdCupon = action.payload
        }).addCase(createCupons.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getACupon.pending , (state)=>{
            state.isLoading = true
        }).addCase(getACupon.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.cuponName = action.payload.data.name
            state.expiryDate = action.payload.data.expiry
            state.totalDiscount= action.payload.data.discount
          
        }).addCase(getACupon.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateCupon.pending , (state)=>{
            state.isLoading = true
        }).addCase(updateCupon.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            
        }).addCase(updateCupon.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
            state.updatedCupon = action.payload
        })
        .addCase(deleteCupon.pending , (state)=>{
            state.isLoading = true
        }).addCase(deleteCupon.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.deletedCupon = action.payload.title
        }).addCase(deleteCupon.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
       
        .addCase(resetState, () => initialState)
    }
})

export default cuponSlice.reducer