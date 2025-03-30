import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AppDispatch, RootState } from "../../../app/store"


export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  isInitialized: boolean
}

export interface User {
  id?: string
  username: string
  email: string
  role: string
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
  isInitialized: false,
}

import { authApi } from "../services/authApi";
export const initializeAuth = createAsyncThunk<
  User | null,  
  void,         
  { 
    state: RootState, 
    dispatch: AppDispatch 
  }
>(
  'auth/initialize',
  async (_, { getState, dispatch }) => {
    const { auth } = getState();
    
    if (auth.token) {
      try {
        const userResponse = await dispatch(
          authApi.endpoints.getCurrentUser.initiate()
        ).unwrap();
        
        return userResponse;
      } catch (error) {
        console.error('Failed to fetch current user', error);
        return null;
      }
    }
    return null;
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      const { user, token } = action.payload
      state.user = user
      state.token = action.payload.token.replace("Bearer ", "");
      state.isAuthenticated = true
      state.error = null
      localStorage.setItem("token", token)
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem("token")
    },
  },extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        } else {
          
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          localStorage.removeItem("token");
        }
        state.isInitialized = true;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        state.error = action.error.message || 'Failed to initialize auth';
      });
  },
});
export const { setCredentials, setUser, setLoading, setError, logout } = authSlice.actions

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectAuthToken = (state: RootState) => state.auth.token
export const selectAuthLoading = (state: RootState) => state.auth.isLoading
export const selectAuthError = (state: RootState) => state.auth.error

export default authSlice.reducer

