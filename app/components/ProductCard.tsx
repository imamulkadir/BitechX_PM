"use client";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteSingleProduct } from "../redux/slices/productSlice";
import { useState } from "react";
import ProductDetailsModal from "./ProductDetailsModal";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false); // boolean instead of slug
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSingleProduct(id))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete product.", "error");
          });
      }
    });
  };

  return (
    <div className="card bg-[var(--text-white)] w-full text-[var(--text-white)] rounded-md overflow-hidden shadow-sm transform transition-all duration-300 hover:scale-101 hover:shadow-lg">
      {/* Image */}
      <figure className="w-full h-48 sm:h-52 md:h-60 overflow-hidden cursor-pointer">
        <img
          onClick={() => setOpenModal(true)}
          src={product?.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </figure>

      {/* Body */}
      <div className="card-body bg-[var(--primary)] p-3 sm:p-4 md:p-5 sm:space-y-2">
        <div className="flex justify-between">
          <h2 className="text-lg sm:text-xl font-semibold tracking-wide line-clamp-1">
            {product.name}
          </h2>
          <div
            className="badge px-3 text-white -mt-12 lg:-mt-0 truncate overflow-hidden whitespace-nowrap"
            style={{
              backgroundColor: "#4E6E5D",
              maxWidth: "clamp(6rem, 25vw, 12rem)", // min 6rem, 25% of viewport, max 12rem
            }}
            title={product.category.name}
          >
            {product.category.name}
          </div>
        </div>
        <p className="text-xs sm:text-sm text-[var(--text-white)]/80 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <p className="text-base sm:text-lg font-bold text-[var(--brown)]">
          ${product.price}
        </p>

        <div className="card-actions flex justify-between mt gap-2 sm:gap-2">
          <button
            onClick={() => router.push(`/products/edit/${product.slug}`)}
            className="flex-1 py-2 border border-[var(--border)] text-[var(--text-white)] flex items-center justify-center gap-2 rounded-md hover:bg-[var(--green)] hover:text-white transition-all"
          >
            <FaEdit size={16} />
            Edit
          </button>
          <button
            onClick={() => handleDelete(product.id)}
            className="flex-1 px-2 py-2 border border-[var(--border)] text-[var(--text-white)] flex items-center justify-center gap-2 rounded-md hover:bg-[var(--red)] hover:text-white transition-all"
          >
            <FaTrashAlt size={16} />
            Delete
          </button>
        </div>
      </div>

      {openModal && (
        <ProductDetailsModal
          product={product}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default ProductCard;
