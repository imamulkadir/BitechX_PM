import axiosInstance from "@/app/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    try {
      const response = await axiosInstance.get("/products");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addProduct = createAsyncThunk("products/create", async (data) => {
  try {
    const response = await axiosInstance.post("/products", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const searchProducts = createAsyncThunk(
  "product/searchProducts",
  async (seachValue) => {
    try {
      const response = await axiosInstance.get("/products/search", {
        params: { searchedText: seachValue },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "/products/details",
  async (slug) => {
    try {
      // console.log(slug);
      const response = await axiosInstance.get(`/products/${slug}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteSingleProduct = createAsyncThunk(
  "/products/delete",
  async (id) => {
    try {
      // console.log(id);
      const response = await axiosInstance.delete(`/products/${id}`);
      // console.log("from slice: ", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "/products/update",
  async (data) => {
    try {
      const response = await axiosInstance.put(`/products/${data.id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response.data);
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
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      })
      .addCase(deleteSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSingleProduct.fulfilled, (state, action) => {
        state.products = state.products?.filter(
          (p) => p.id !== action.meta.arg
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products?.filter(
          (p) => p.id !== action.meta.arg
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      });
  },
});

export const { resetState } = productSlice.actions;
export default productSlice.reducer;
