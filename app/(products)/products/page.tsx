"use client";
import ProductCard from "@/app/components/ProductCard";
import { fetchProducts, searchProducts } from "@/app/redux/slices/productSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import axiosInstance from "@/app/lib/axiosInstance";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state: any) => state.product);
  const [searchedText, setSearchedText] = useState("");

  const [value, setValue] = useState("all");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "home", label: "Home" },
  ];

  useEffect(() => {
    dispatch(fetchProducts());

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  useEffect(() => {
    if (!searchedText) {
      dispatch(fetchProducts());
    }
    const delay = setTimeout(() => {
      dispatch(searchProducts(searchedText));
    }, 1000);
    return () => clearTimeout(delay);
  }, [dispatch, searchedText]);

  // Filter products by category
  const filteredProducts =
    value === "all"
      ? products
      : products.filter((p: any) => p.category === value);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // console.log(loading);

  // const searcProducts = async () => {
  //   const data = axiosInstance.get(
  //     "https://api.bitechx.com/products/search?searchedText=test+pro"
  //   );
  //   console.log(data);
  // };

  // searcProducts();

  console.log(searchedText);

  return (
    <div
      className="flex flex-col mt-6 max-w-[1440px] mx-auto"
      style={{ minHeight: "calc(100vh - 202px)" }}
    >
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center px-4">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <h1 className="text-4xl font-bold">Products</h1>
            <p className="text-gray-500">Manage your product catalog</p>
          </div>
          <div>
            <button className="flex justify-between items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--text-white)] rounded-md hover:bg-[var(--green)] hover:text-white transition-all">
              <FaPlus />
              Add Product
            </button>
          </div>
        </div>

        {/* Search & Category */}
        <div className="flex flex-col sm:flex-row gap-4 px-4 mt-4">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              required
              placeholder="Search"
              className="pl-10 w-full border border-gray-300 rounded-md h-10 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
              onChange={(e) => {
                setSearchedText(e.target.value);
              }}
            />
          </div>

          <div ref={dropdownRef} className="relative w-full sm:w-[200px] z-50">
            <button
              type="button"
              className="text-sm w-full h-10 border border-gray-300 rounded-md px-3 text-left flex items-center justify-between transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--brown)]"
              onClick={() => setOpen(!open)}
            >
              {options.find((o) => o.value === value)?.label}
              <span className="ml-2">
                <MdKeyboardArrowDown size={20} />
              </span>
            </button>

            {open && (
              <ul className="absolute p-2 space-y-2 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto transition-all duration-200">
                {options.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => {
                      setValue(option.value);
                      setCurrentPage(1); // reset page on filter change
                      setOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer text-sm rounded-md ${
                      value === option.value
                        ? "bg-[var(--brown)] text-white"
                        : "hover:bg-[var(--brown)] hover:text-white transition-all duration-200"
                    }`}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mt-8 px-4">
        {loading ? (
          <div className="text-center text-gray-500 py-10 text-lg">
            Loading products...
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 md:gap-2">
            {paginatedProducts?.map((product: any, index: number) => (
              <ProductCard
                key={index}
                image={product?.images?.[0]}
                name={product.name}
                description={product.description}
                price={product.price}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            className="px-3 py-1 border rounded-md hover:bg-gray-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border rounded-md ${
                page === currentPage
                  ? "bg-[var(--brown)] text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded-md hover:bg-gray-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
