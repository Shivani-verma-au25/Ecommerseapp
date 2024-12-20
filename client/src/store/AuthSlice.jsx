import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isAuthenticated  : false,
    isLoading : true,
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


// check auth user
export const checkauth = createAsyncThunk('/auth/checkAuth', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/auth/checkauth`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
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
            state.isLoading = false
            state.isAuthenticated = action?.payload?.success ? true : false,
            state.user = action?.payload?.success ?  action?.payload?.user : null
          
        })
        .addCase(login.rejected , (state , action) =>{
            state.isLoading  = false,
            state.user = null,
            state.isAuthenticated  = false
        })

        .addCase(checkauth.pending , (state) => {
            state.isLoading = true
        })
        .addCase(checkauth.fulfilled , (state , action) =>{
            console.log(action ,"from slice")
            state.isLoading = false
            state.isAuthenticated = action?.payload?.success ? true : false,
            state.user = action?.payload?.success ?  action?.payload?.user : null
          
        })
        .addCase(checkauth.rejected , (state , action) =>{
            state.isLoading  = false,
            state.user = null,
            state.isAuthenticated  = false
        })
    }
})

export const {setUser} = authSlice.actions
export default authSlice.reducer