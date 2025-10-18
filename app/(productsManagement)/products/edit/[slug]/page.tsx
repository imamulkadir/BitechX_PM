"use client";

import ProductForm from "@/app/components/ProductForm";
import { fetchCategories } from "@/app/redux/slices/categorySlice";
import {
  fetchSingleProduct,
  updateProduct,
} from "@/app/redux/slices/productSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Slide, toast } from "react-toastify";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { FaArrowLeft } from "react-icons/fa";

interface Category {
  id: string;
  name: string;
}
interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: string;
  categoryId: string;
}
interface RootState {
  categories: { categories: Category[]; loading: boolean };
}
type FetchProductResult = Product;

const fetchCategoriesThunk = fetchCategories;
const fetchSingleProductThunk = fetchSingleProduct;
const updateProductThunk = updateProduct;

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface ProductFormState {
  name: string;
  description: string;
  images: string[];
  price: string;
  category: string;
  imageInput: string;
}

interface UpdatePayload {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: string;
  categoryId: string;
}

const UpdatePage = () => {
  const params = useParams<{ slug: string }>();
  const { slug } = params;

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [productId, setProductId] = useState("");

  const { categories, loading: categoryLoading } = useSelector(
    (state: RootState) => state.categories
  );

  const [formData, setFormData] = useState<ProductFormState>({
    name: "",
    description: "",
    images: [] as string[],
    price: "",
    category: "",
    imageInput: "",
  });

  useEffect(() => {
    dispatch(fetchCategoriesThunk());

    dispatch(fetchSingleProductThunk(slug)).then((res: AnyAction) => {
      if (res.meta.requestStatus === "fulfilled" && res.payload) {
        const product: FetchProductResult = res.payload;
        setProductId(product.id);

        setFormData({
          name: product.name,
          description: product.description,
          images: product.images || [],
          price: product.price,
          category: product.categoryId,
          imageInput: product.images?.join(", ") || "",
        });
      }
    });
  }, [dispatch, slug]);

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
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: UpdatePayload = {
      id: productId,
      name: formData.name,
      description: formData.description,
      images: formData.images,
      price: formData.price,
      categoryId: formData.category,
    };
    // @ts-expect-error hmm
    dispatch(updateProductThunk(payload)).then((res: AnyAction) => {
      if (res.meta.requestStatus === "rejected") {
        toast.error("Failed to update product!", {
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
      }
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Product updated!", {
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
    <>
      <div className="max-w-2xl mx-auto mt-6 px-4">
        <button
          onClick={() => router.push("/products")}
          className="flex justify-between items-center gap-2 cursor-pointer text-[var(--green)] hover:text-[var(--brown)]"
        >
          <FaArrowLeft /> Back
        </button>
      </div>
      <div className="max-w-2xl mx-auto mt-4 p-6 bg-white shadow-md rounded-lg">
        {formData.name || formData.description || formData.images.length ? (
          <ProductForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            categories={categories}
            categoryLoading={categoryLoading}
            from="update"
          />
        ) : (
          <div className="text-center py-10 text-gray-500">
            Loading product...
          </div>
        )}
      </div>
    </>
  );
};

export default UpdatePage;
