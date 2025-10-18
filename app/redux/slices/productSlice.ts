import axiosInstance from "@/app/lib/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images?: string[];
  category?: { name: string };
}

interface ProductState {
  products: Product[] | null;
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: null,
  product: null,
  loading: false,
  error: null,
};

// -------------------- Thunks --------------------

// Fetch all products
import axios from "axios";

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("product/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || error.message);
    }
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to fetch products");
  }
});

// Search products
export const searchProducts = createAsyncThunk<
  Product[],
  string,
  { rejectValue: string }
>("product/searchProducts", async (searchValue, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/products/search", {
      params: { searchedText: searchValue },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || error.message);
    }
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to search products");
  }
});

// Add product
export const addProduct = createAsyncThunk<
  Product,
  Partial<Product>,
  { rejectValue: string }
>("products/create", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/products", data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || error.message);
    }
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to add product");
  }
});

// Fetch single product
export const fetchSingleProduct = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("products/fetchSingle", async (slug, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/products/${slug}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || error.message);
    }
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to fetch product details");
  }
});

// Delete product
export const deleteSingleProduct = createAsyncThunk<
  string, // returned value: deleted product ID
  string, // argument: product ID
  { rejectValue: string }
>("products/delete", async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/products/${id}`);
    return id; // return deleted product ID
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || error.message);
    }
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to delete product");
  }
});

// Update product
export interface UpdateProductPayload {
  id: string;
  name?: string;
  price?: number;
  description?: string;
  images?: string[];
  category?: { name: string };
}

export const updateProduct = createAsyncThunk<
  Product,
  UpdateProductPayload,
  { rejectValue: string }
>("products/update", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/products/${data.id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || error.message);
    }
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to update product");
  }
});

// -------------------- Slice --------------------
export const productSlice = createSlice({
  name: "product",
  initialState,
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
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // Search Products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.product = action.payload;
          state.products = state.products
            ? [action.payload, ...state.products]
            : [action.payload];
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // Fetch Single Product
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSingleProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.product = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // Delete Product
      .addCase(deleteSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteSingleProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.products =
            state.products?.filter((p) => p.id !== action.payload) ?? null;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(deleteSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products =
            state.products?.map((p) =>
              p.id === action.payload.id ? action.payload : p
            ) ?? null;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { resetState } = productSlice.actions;
export default productSlice.reducer;
