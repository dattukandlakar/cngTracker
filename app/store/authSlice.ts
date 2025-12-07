import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { UserRole } from '../types/roles';
import apiClient from '../services/api';
import { SignupRequest, SignupResponse, LoginRequest, LoginResponse } from '../types/auth';

// Define a separate type for signup response that doesn't include full user details
type SignupSuccessResponse = {
  success: boolean;
  message: string;
};

type AuthUser = {
  id: string;
  name: string;
  email?: string;
  mobile: string;
  carNumber?: string;
  role: UserRole;
  deviceId: string;
};

type LoginCredentials = {
  mobile: string;
};

type SignupPayload = {
  name: string;
  mobile: string;
};

type AuthState = {
  user?: AuthUser;
  status: 'idle' | 'loading';
  error?: string;
};

const initialState: AuthState = {
  status: 'idle',
};

// Updated to use real API
export const loginUser = createAsyncThunk<AuthUser, LoginCredentials>(
  'auth/loginUser',
  async ({ mobile }, { rejectWithValue }) => {
    try {
      // Prepare request data - deviceId will be added by interceptor
      const requestData: Omit<LoginRequest, 'deviceId'> = {
        mobileNumber: mobile,
      };

      // Make API call
      const response = await apiClient.post<LoginResponse>('/auth/login', requestData);
      
      // Transform response to match AuthUser type
      // Default to 'manager' role since API doesn't return role information
      return {
        id: response.data.id,
        name: response.data.userName,
        mobile: response.data.mobileNumber,
        role: 'manager', // Default to manager role
        deviceId: response.data.deviceId,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);

// Updated to use real API - now returns a success indicator instead of full user details
export const signupUser = createAsyncThunk<SignupSuccessResponse, SignupPayload>(
  'auth/signupUser',
  async ({ name, mobile }, { rejectWithValue }) => {
    try {
      // Prepare request data (deviceId will be added by interceptor)
      const requestData: Omit<SignupRequest, 'deviceId'> = {
        userName: name,
        mobileNumber: mobile,
      };

      // Make API call
      await apiClient.post<SignupResponse>('/auth/register', requestData);
      
      // Return success response
      return {
        success: true,
        message: 'Signup successful! Please login with your credentials.'
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = undefined;
      state.error = undefined;
      state.status = 'idle';
    },
    clearError(state) {
      state.error = undefined;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload as string || 'Login failed';
      })
      .addCase(signupUser.pending, state => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(signupUser.fulfilled, (state) => {
        // Don't set user on signup, just keep success state
        state.status = 'idle';
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload as string || 'Signup failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export type { AuthState, AuthUser };

export default authSlice.reducer;