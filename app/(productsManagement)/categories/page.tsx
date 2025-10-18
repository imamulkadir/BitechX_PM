"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/app/redux/slices/categorySlice";
// Import necessary types from Redux Toolkit
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

// --- 1. Define Essential Types for Type Safety ---

// Define the shape of a single Category object
interface Category {
  id: string;
  name: string;
  image?: string; // Assuming 'image' exists based on the usage in the template
  // Add other properties found on your category objects
}

// Define the shape of the 'categories' slice state
interface CategoryState {
  categories: Category[];
  loading: boolean;
  // Include other state properties if necessary (e.g., error: string | null)
}

// Define the minimal RootState needed by this component
interface RootStateSubset {
  categories: CategoryState;
  // If other slices were used, they would be defined here too
}

// Define a type for the dispatch function to correctly handle thunks
type AppDispatch = ThunkDispatch<RootStateSubset, unknown, AnyAction>;

const CategoryPage = () => {
  // 2. Type useDispatch
  const dispatch: AppDispatch = useDispatch();

  // 3. Type useSelector using RootStateSubset
  const { categories, loading } = useSelector(
    (state: RootStateSubset) => state.categories
  );

  // 4. Dispatch is now type-safe
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-8">Loading categories...</p>
    );
  }

  // 5. Check if categories is defined and empty (TypeScript knows categories is Category[])
  if (!categories || categories.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">No categories found.</p>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-6 text-[var(--green)]">
        Total Categories [
        <span className="text-xl px-2 text-[var(--brown)]">
          {categories.length}
        </span>
        ]
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {categories.map(
          (
            category: Category // Explicitly typing map item for clarity
          ) => (
            <div
              key={category.id}
              className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg group"
            >
              {/* Category Image */}
              <img
                src={
                  category.image ||
                  "https://placehold.co/400x400/CCCCCC/333333?text=Placeholder"
                }
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
          )
        )}
      </div>
    </>
  );
};

export default CategoryPage;
