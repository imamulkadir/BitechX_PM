import axiosInstance from "@/app/lib/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { AxiosError } from "axios";

// --- 1. Define TypeScript Interfaces ---

// Define the structure of the decoded JWT payload
interface DecodedToken {
  email: string;
  // Add other properties you might use from the token, e.g., userId: string;
}

// Define the shape of the data returned from the successful login API call
interface LoginResponse {
  token: string;
}

// Define the shape of the Auth slice's state
interface AuthState {
  user: string | null; // Assuming user stores the email
  token: string | null;
  loading: boolean;
  error: unknown; // Use 'unknown' for better type safety when dealing with errors
}

// --- 2. Define Initial State ---

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// --- 3. Define Async Thunk (login) ---

export const login = createAsyncThunk<
  LoginResponse, // 1. Return type of the fulfilled thunk (what the API returns)
  { email: string }, // 2. Argument type passed to the thunk
  { rejectValue: AxiosError } // 3. Type of the rejected payload
>("auth/login", async (values, { rejectWithValue }) => {
  try {
    // Axios response data is typed as LoginResponse
    const response = await axiosInstance.post<LoginResponse>("/auth", values);
    return response.data;
  } catch (error) {
    // Use rejectWithValue to correctly handle errors
    return rejectWithValue(error as AxiosError);
  }
});

// --- 4. Define Auth Slice ---

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("jw_token"); // Clear token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // PENDING
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // FULFILLED (Success) - Corrected 'as any' and '@ts-expect-error'
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.token = action.payload.token;

          // Fix: Removed 'as any'. state.token is guaranteed to be a string here.
          localStorage.setItem("jw_token", state.token);

          // Fix: Cast the result of jwtDecode to the DecodedToken interface
          const data = jwtDecode(state.token) as DecodedToken;

          // Assign the typed email to state.user
          state.user = data.email;
          state.loading = false;
          state.error = null;
        }
      )
      // REJECTED (Error) - Corrected 'as any'
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        // Fix: action.payload is now correctly typed as AxiosError (or undefined if no rejectValue)
        state.error = action.payload || action.error.message;
        state.token = null; // Clear token on failed login attempt
        state.user = null;
      });
  },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
