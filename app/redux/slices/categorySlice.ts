import axiosInstance from "@/app/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk("/categories", async () => {
  try {
    const response = await axiosInstance.get("/categories");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const categorySlice = createSlice({
  name: "category",
  initialState: { categories: [], loading: false, error: null },
  reducers: {
    resetState: (state) => {
      state.categories = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      });
  },
});

export const { resetState } = categorySlice.actions;
export default categorySlice.reducer;
