"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/app/redux/slices/categorySlice";
import { useRouter } from "next/navigation";
import { addProduct } from "@/app/redux/slices/productSlice";
import { Bounce, toast } from "react-toastify";
import ProductForm from "@/app/components/ProductForm";

const CreatePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { categories, loading: categoryLoading } = useSelector(
    (state: any) => state.categories
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [] as string[],
    price: "",
    category: "",
    imageInput: "", // temp string input for comma-separated URLs
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // If editing imageInput, also update images array
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

    // Prepare payload
    const payload = {
      name: formData.name,
      description: formData.description,
      images: formData.images,
      price: formData.price,
      categoryId: formData.category,
    };

    dispatch(addProduct(payload)).then((data) => {
      //   console.log(data);
      if (data.error) {
        toast.error("Failed to add product!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        router.push("/products/create");
      }
      if (data.payload) {
        toast.success("Product added!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        router.push("/products");
      }
    });

    console.log("Payload:", payload);

    // TODO: Replace with API POST request
    //
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <ProductForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        categories={categories}
        categoryLoading={categoryLoading}
        from="create"
      />
    </div>
  );
};

export default CreatePage;
