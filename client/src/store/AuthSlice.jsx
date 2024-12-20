import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isAuthenticated  : false,
    isLoading : false,
    user : null
}

export const register = createAsyncThunk('/auth/register', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/register`, formData, {
            withCredentials: true,
        });
        return response.data; 
    } catch (error) {
        // Reject with error message
        return rejectWithValue(
            error.response && error.response.data ? error.response.data.message : error.message
        );
    }
});


// login user
export const login = createAsyncThunk('/auth/login', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/login`, formData, {
            withCredentials: true,
        });
        return response.data; 
    } catch (error) {
        // Reject with error message
        return rejectWithValue(
            error.response && error.response.data ? error.response.data.message : error.message
        );
    }
});

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setUser : (state ,action) =>{}
    },
    
    extraReducers : (builder) =>  {builder
        .addCase(register.pending , (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled , (state , action) =>{
            state.isLoading  = false,
            state.user = null,
            state.isAuthenticated  = false
        })
        .addCase(register.rejected , (state , action) =>{
            state.isLoading  = false,
            state.user = null,
            state.isAuthenticated  = false
        })

        .addCase(login.pending , (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled , (state , action) =>{
            console.log(action ,"from slice")
            state.isAuthenticated = action?.payload?.success ? true : false,
            state.user = action?.payload?.success ?  action?.payload?.user : null
          
        })
        .addCase(login.rejected , (state , action) =>{
            state.isLoading  = false,
            state.user = null,
            state.isAuthenticated  = false
        })
    }
})

export const {setUser} = authSlice.actions
export default authSlice.reducer