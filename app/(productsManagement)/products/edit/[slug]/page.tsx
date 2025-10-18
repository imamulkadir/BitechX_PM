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

const UpdatePage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [productId, setProductId] = useState("");
  //   console.log(slug);

  const { categories, loading: categoryLoading } = useSelector(
    (state: any) => state.categories
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [] as string[],
    price: "",
    category: "",
    imageInput: "",
  });

  // Fetch product details on mount
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSingleProduct(slug)).then((res: any) => {
      if (res.payload) {
        const product = res.payload;
        setProductId(product.id);
        console.log(product);
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

  //   console.log(formData);

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

    const payload = {
      id: productId,
      name: formData.name,
      description: formData.description,
      images: formData.images,
      price: formData.price,
      categoryId: formData.category,
    };

    dispatch(updateProduct(payload)).then((data: any) => {
      if (data.error) {
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
      if (data.payload) {
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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
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
  );
};

export default UpdatePage;
