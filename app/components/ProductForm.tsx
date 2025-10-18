"use client";
import { useState } from "react";

type ProductFormProps = {
  formData: {
    name: string;
    description: string;
    images: string[];
    price: string;
    category: string;
    imageInput: string;
  };
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  categories: { id: string; name: string; slug?: string }[];
  categoryLoading: boolean;
  from: "create" | "update";
};

const ProductForm = ({
  formData,
  handleChange,
  handleSubmit,
  categories,
  categoryLoading,
  from,
}: ProductFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    let message = "";
    switch (name) {
      case "name":
        if (!value.trim()) message = "Product name is required.";
        break;
      case "description":
        if (!value.trim()) message = "Description cannot be empty.";
        break;
      case "price":
        if (!value || parseFloat(value) <= 0)
          message = "Enter a valid price greater than 0.";
        break;
      case "category":
        if (!value) message = "Please select a category.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    handleChange(e);
    validateField(name, value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    ["name", "description", "price", "category"].forEach((field) => {
      const value = (formData as any)[field];
      validateField(field, value);
      if (!value || (field === "price" && parseFloat(value) <= 0)) {
        newErrors[field] = `${
          field[0].toUpperCase() + field.slice(1)
        } is required.`;
      }
    });

    if (Object.values(newErrors).some((err) => err)) {
      setErrors(newErrors);
      return;
    }

    handleSubmit(e);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center text-[var(--brown)]">
        {from === "create" ? "Add Product" : "Update Product"}
      </h1>

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none`}
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            className={`w-full border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-md px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none`}
            placeholder="Enter product description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Images */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Images (comma-separated URLs)
          </label>
          <input
            type="text"
            name="imageInput"
            value={formData.imageInput}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
            placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
          />
          {formData.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
            className={`w-full border ${
              errors.price ? "border-red-500" : "border-gray-300"
            } rounded-md px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none`}
            placeholder="Enter price (e.g. 25.99)"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`w-full border ${
              errors.category ? "border-red-500" : "border-gray-300"
            } rounded-md px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none`}
          >
            <option value="">Select a category</option>
            {categoryLoading ? (
              <option disabled>Loading...</option>
            ) : (
              categories?.map((cat) => (
                <option key={cat.id} value={cat.slug || cat.id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[var(--primary)] text-white py-2 rounded-md font-medium hover:bg-[var(--green)] transition-all"
        >
          {from === "create" ? "Add Product" : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
