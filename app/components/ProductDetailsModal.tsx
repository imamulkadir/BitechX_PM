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
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="font-bold text-lg mt-2">Price: ${product.price}</p>

        <p className="py-4">{product.description}</p>
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-64 object-cover rounded"
        />
      </div>
    </dialog>
  );
};

export default ProductDetailsModal;
