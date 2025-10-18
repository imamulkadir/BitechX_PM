const ProductDetailsModal = ({ product, onClose }) => {
  return (
    <dialog open className="modal">
      <div className="modal-box relative">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-64 object-cover rounded mt-4"
        />
        <h3 className="font-bold text-lg">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg mt-2 text-gray-300">
            Price: <span className="text-[var(--brown)]">${product.price}</span>
          </p>
          <div
            className="badge px-2 text-white"
            style={{ backgroundColor: "#4E6E5D" }}
          >
            {product.category.name}
          </div>
        </div>
        <p className="py-4">{product.description}</p>
      </div>
    </dialog>
  );
};

export default ProductDetailsModal;
