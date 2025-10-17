import axiosInstance from "@/app/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export const login = createAsyncThunk(
  "auth/login",
  async (values: { email: string }) => {
    // console.log(values);
    try {
      const response = await axiosInstance.post("/auth", values);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.token = action.payload.token;
        localStorage.setItem("jw_token", state.token as any);
        const data = jwtDecode(state.token);
        // console.log(data);
        state.user = data.email;
        // console.log(state.user);
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      });
  },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
