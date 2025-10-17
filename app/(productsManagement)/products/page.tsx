"use client";
import ProductCard from "@/app/components/ProductCard";
import { fetchProducts, searchProducts } from "@/app/redux/slices/productSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import { fetchCategories } from "@/app/redux/slices/categorySlice";
import { useRouter } from "next/navigation";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { products, loading } = useSelector((state: any) => state.product);
  const [searchedText, setSearchedText] = useState("");

  const [category, setCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const options = useMemo(() => {
    if (!categories || categories.length === 0) {
      return [{ value: "all", label: "All Categories" }];
    }

    const dynamicOptions = categories.map((cat) => ({
      value: cat.slug || cat.name.toLowerCase(),
      label: cat.name,
    }));

    return [{ value: "all", label: "All Categories" }, ...dynamicOptions];
  }, [categories]);

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
    if (searchedText === "") {
      dispatch(fetchProducts());
      return;
    }
    const delay = setTimeout(() => {
      dispatch(searchProducts(searchedText));
    }, 1000);
    return () => clearTimeout(delay);
  }, [dispatch, searchedText]);

  useEffect(() => {
    if (!products) return;

    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const tempCategory = products.filter(
        (p: any) => p.category.name.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(tempCategory);
    }
  }, [category, products]);

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
            <button
              onClick={() => {
                router.push("/products/create");
              }}
              className="flex justify-between items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--text-white)] rounded-md hover:bg-[var(--green)] hover:text-white transition-all"
            >
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
              {options.find((o) => o.value === category)?.label}
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
                      setCategory(option.value);
                      setCurrentPage(1); // reset page on filter change
                      setOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer text-sm rounded-md ${
                      category === option.value
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
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 md:gap-2 mb-4">
            {paginatedProducts?.map((product: any, index: number) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-1 mt-6">
          <button
            className="px-2 py-1 border rounded-md text-xs sm:text-sm hover:bg-gray-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-2 py-1 border rounded-md text-xs sm:text-sm ${
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
            className="px-2 py-1 border rounded-md text-xs sm:text-sm hover:bg-gray-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
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
