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

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: null,
    product: null,
    laoding: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.products = null;
      state.product = null;
      state.laoding = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.laoding = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.laoding = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.laoding = false;
        state.error = action.payload as any;
      });
  },
});

export const { resetState } = productSlice.actions;
export default productSlice.reducer;
