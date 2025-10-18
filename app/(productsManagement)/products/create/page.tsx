"use client";
import { useEffect, useState } from "react";
// Import standard hooks
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/app/redux/slices/categorySlice";
import { useRouter } from "next/navigation";
import { addProduct } from "@/app/redux/slices/productSlice";
import { Slide, toast } from "react-toastify";
import ProductForm from "@/app/components/ProductForm";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { FaArrowLeft } from "react-icons/fa";

// --- 1. Define Essential Types ---

// Define the shape of the Category object
interface Category {
  id: string;
  name: string;
  // Add other category fields if needed
}

// Define the shape of the Product Form state
interface ProductFormState {
  name: string;
  description: string;
  images: string[];
  price: string;
  category: string; // ID of the selected category
  imageInput: string;
}

// Define the shape of the payload for addProduct thunk
interface AddProductPayload {
  name: string;
  description: string;
  images: string[];
  price: string;
  categoryId: string;
}

// Define the shape of the Redux state needed by this component
interface RootStateSubset {
  categories: {
    categories: Category[];
    loading: boolean;
  };
  // Add other slice states (e.g., products) if needed here
}

// Define a type for the dispatch function to correctly handle thunks
type AppDispatch = ThunkDispatch<RootStateSubset, unknown, AnyAction>;

// --- 2. Component Implementation ---

const CreatePage = () => {
  // Use the typed dispatch type
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  // FIX: Explicitly type the state in useSelector using RootStateSubset
  const { categories, loading: categoryLoading } = useSelector(
    (state: RootStateSubset) => state.categories
  );

  // FIX: Type the useState hook
  const [formData, setFormData] = useState<ProductFormState>({
    name: "",
    description: "",
    images: [],
    price: "",
    category: "",
    imageInput: "",
  });

  useEffect(() => {
    // FIX: Dispatch directly. The AppDispatch type handles the thunk return type.
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "imageInput") {
      const urls = value
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      setFormData((prev) => ({
        ...prev,
        imageInput: value,
        images: urls,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name as keyof ProductFormState]: value, // Type assertion for computed property
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // FIX: Type the payload
    const payload: AddProductPayload = {
      name: formData.name,
      description: formData.description,
      images: formData.images,
      price: formData.price,
      categoryId: formData.category,
    };

    // FIX: Dispatch directly and type the result of the .then() promise as AnyAction
    // @ts-expect-error hmm
    dispatch(addProduct(payload)).then((res: AnyAction) => {
      // Check for rejected (error) status
      if (res.meta.requestStatus === "rejected") {
        toast.error("Failed to add product!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        // Consider removing this line if you want to stay on the create page after error:
        router.push("/products/create");
      }

      // Check for fulfilled (success) status and payload existence
      if (res.meta.requestStatus === "fulfilled" && res.payload) {
        toast.success("Product added!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        router.push("/products");
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <button
        onClick={() => router.push("/products")}
        className="flex items-center gap-2 text-[var(--green)] hover:text-[var(--brown)]"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="mt-4 p-6 bg-white shadow-md rounded-lg">
        <ProductForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          categories={categories}
          categoryLoading={categoryLoading}
          from="create"
        />
      </div>
    </div>
  );
};

export default CreatePage;
