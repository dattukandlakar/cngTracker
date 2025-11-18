import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDeviceId } from '../utils/deviceId';
import type { UserRole } from '../types/roles';

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
  password: string;
};

type SignupPayload = {
  name: string;
  mobile: string;
  carNumber: string;
  password: string;
  email?: string;
};

type AuthState = {
  user?: AuthUser;
  status: 'idle' | 'loading';
  error?: string;
};

const initialState: AuthState = {
  status: 'idle',
};

const fakeNetworkCall = async () => {
  await new Promise((resolve: any) => setTimeout(resolve, 750));
};

export const loginUser = createAsyncThunk<AuthUser, LoginCredentials>(
  'auth/loginUser',
  async ({ mobile, password }) => {
    // Get or generate device ID automatically
    const deviceId = await getDeviceId();
    
    await fakeNetworkCall();

    // TODO: Replace with actual API call
    // API should receive: { mobile, password, deviceId }
    // deviceId is sent automatically, user never sees it

    return {
      id: 'user-001',
      name: mobile, // Temporary: will be replaced with actual user data from API
      mobile,
      role: 'user', // Default role, will be set by backend
      deviceId,
    };
  },
);

export const signupUser = createAsyncThunk<AuthUser, SignupPayload>(
  'auth/signupUser',
  async ({ name, mobile, carNumber, password, email }) => {
    // Get or generate device ID automatically
    const deviceId = await getDeviceId();
    
    await fakeNetworkCall();

    // TODO: Replace with actual API call
    // API should receive: { name, mobile, carNumber, password, email?, deviceId }
    // deviceId is sent automatically, user never sees it

    return {
      id: 'user-002',
      name,
      mobile,
      carNumber,
      email,
      role: 'user', // Default role for new users, can be changed by admin later
      deviceId,
    };
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
        state.error = action.error.message || 'Login failed';
      })
      .addCase(signupUser.pending, state => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message || 'Signup failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export type { AuthState, AuthUser };

export default authSlice.reducer;


