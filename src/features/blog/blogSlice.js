import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";

export const getBlogs =  createAsyncThunk("blog/all-blogs",async(thunkAPI)=>{
    try {
        return await blogService.getBlogs()

    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const createBlogs =  createAsyncThunk("blog/create-blogs",async(blog,thunkAPI)=>{
    try {
        return await blogService.createBlogs(blog)

    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getABlog =  createAsyncThunk("blog/get-blog",async(id,thunkAPI)=>{
    try {
        return await blogService.getABlog(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const updateBlog =  createAsyncThunk("blog/update-blog",async(blog,thunkAPI)=>{
    try {
        return await blogService.updateBlog(blog)

    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deleteBlog =  createAsyncThunk("blog/delete-blog",async(id,thunkAPI)=>{
    try {
        return await blogService.deleteBlog(id)

    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const resetState = createAction("Reset_all");

const initialState = {
    blogs : [],
    singleBlog : [],
    isError : false,
    isLoading : false,
    isSuccess : false,
    message : ""
}

export const blogSlice = createSlice({
    name : "blogs",
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder
        .addCase(getBlogs.pending , (state)=>{
            state.isLoading = true
        }).addCase(getBlogs.fulfilled , (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.blogs = action.payload
        }).addCase(getBlogs.rejected , (state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(createBlogs.pending , (state)=>{
            state.isLoading = true
        }).addCase(createBlogs.fulfilled , (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.createdBlog = action.payload
        }).addCase(createBlogs.rejected , (state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getABlog.pending , (state)=>{
            state.isLoading = true
        }).addCase(getABlog.fulfilled , (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.singleBlog = action.payload
        }).addCase(getABlog.rejected , (state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateBlog.pending , (state)=>{
            state.isLoading = true
        }).addCase(updateBlog.fulfilled , (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.updatedBlog = action.payload
           
        }).addCase(updateBlog.rejected , (state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(deleteBlog.pending , (state)=>{
            state.isLoading = true
        }).addCase(deleteBlog.fulfilled , (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.deletedBlog = action.payload
    
        }).addCase(deleteBlog.rejected , (state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(resetState, () => initialState);
       
    }
})

export default blogSlice.reducer