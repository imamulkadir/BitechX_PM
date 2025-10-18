"use client";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteSingleProduct } from "../redux/slices/productSlice";

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: string | number;
  images?: string[];
  category: {
    id: string;
    name: string;
  };
};

type ProductDetailsModalProps = {
  product: Product;
  onClose: () => void;
};

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
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
        // @ts-expect-error hmm
        dispatch(deleteSingleProduct(id))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
            onClose();
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete product.", "error");
          });
      }
    });
  };

  const handleEdit = () => {
    router.push(`/products/edit/${product.slug}`);
    onClose();
  };

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

        <h3 className="font-bold text-lg my-2">{product.name}</h3>
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

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleEdit}
            className="flex-1 py-2 border border-[var(--border)] text-[var(--text-white)] flex items-center justify-center gap-2 rounded-md hover:bg-[var(--green)] hover:text-white transition-all"
          >
            <FaEdit size={16} /> Edit
          </button>
          <button
            onClick={() => handleDelete(product.id)}
            className="flex-1 py-2 border border-[var(--border)] text-[var(--text-white)] flex items-center justify-center gap-2 rounded-md hover:bg-[var(--red)] hover:text-white transition-all"
          >
            <FaTrashAlt size={16} /> Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ProductDetailsModal;
