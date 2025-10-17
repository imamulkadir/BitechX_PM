"use client";
// import Image from "next/image";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ProductCard = ({ image, name, description, price }) => {
  return (
    <div className="card bg-[var(--text-white)] w-full shadow-sm text-[var(--text-white)] rounded-md overflow-hidden">
      {/* Image */}
      <figure className="w-full h-48 sm:h-52 md:h-60 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </figure>

      {/* Body */}
      <div className="card-body bg-[var(--primary)] p-3 sm:p-4 md:p-5 sm:space-y-2">
        {/* Title */}
        <h2 className="text-lg sm:text-xl font-semibold tracking-wide line-clamp-1">
          {name}
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[var(--text-white)]/80 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Price */}
        <p className="text-base sm:text-lg font-bold text-[var(--brown)]">
          ${price}
        </p>

        {/* Actions */}
        <div className="card-actions flex justify-between mt gap-2 sm:gap-2">
          <button className="flex-1 py-2 border border-[var(--border)] text-[var(--text-white)] flex items-center justify-center gap-2 rounded-md hover:bg-[var(--green)] hover:text-white transition-all">
            <FaEdit size={16} />
            Edit
          </button>
          <button className="flex-1 px-2 py-2 border border-[var(--border)] text-[var(--text-white)] flex items-center justify-center gap-2 rounded-md hover:bg-[var(--red)] hover:text-white transition-all">
            <FaTrashAlt size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
