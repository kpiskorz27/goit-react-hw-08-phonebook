import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'https://connections-api.goit.global';

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Registering user:', userData);
      const response = await axios.post(`${API_URL}/users/signup`, userData);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.code === 11000
      ) {
        return rejectWithValue({ errorMessage: 'Email already in use' });
      }
      console.error(
        'Registration error:',
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : { errorMessage: error.message }
      );
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Logging in user:', userData);
      const response = await axios.post(`${API_URL}/users/login`, userData);
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Login error:',
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = jwtDecode(action.payload.token);
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = jwtDecode(action.payload.token);
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.errorMessage || 'Registration failed';
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.errorMessage || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
