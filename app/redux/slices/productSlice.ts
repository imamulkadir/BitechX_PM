import axiosInstance from "@/app/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    try {
      const response = await axiosInstance.get("/products");
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const searchProducts = createAsyncThunk(
  "product/searchProducts",
  async (seachValue) => {
    try {
      const response = await axiosInstance.get("/products/search", {
        params: { searchedText: seachValue },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: null,
    product: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.products = null;
      state.product = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      });
  },
});

export const { resetState } = productSlice.actions;
export default productSlice.reducer;
