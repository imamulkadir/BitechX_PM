import axios from "axios";
import axiosInstance from "@/app/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Define Category type
export interface Category {
  id: string;
  name: string;
  // add other fields if necessary
}

// Use rejectValue for proper typing
export const fetchCategories = createAsyncThunk<
  Category[], // return type
  void, // argument
  { rejectValue: string } // type for errors
>("/categories", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || error.message);
    }
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to fetch categories");
  }
});

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
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
        state.error = action.payload || "Unknown error";
      });
  },
});

export const { resetState } = categorySlice.actions;
export default categorySlice.reducer;
