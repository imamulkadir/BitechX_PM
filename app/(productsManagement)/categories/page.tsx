"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/app/redux/slices/categorySlice";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-8">Loading categories...</p>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">No categories found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg group"
        >
          {/* Category Image */}
          <img
            src={category.image || "/placeholder.jpg"}
            alt={category.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300"></div>

          {/* Category Name (Centered) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-lg font-semibold text-center px-3 capitalize">
              {category.name}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
