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
};

const ProductForm = ({
  formData,
  handleChange,
  handleSubmit,
  categories,
  categoryLoading,
  from,
}: ProductFormProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center text-[var(--brown)]">
        {from === "create" ? "Add Product" : "Update Product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
            placeholder="Enter product name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
            placeholder="Enter product description"
          ></textarea>
        </div>

        {/* Images (comma-separated URLs) */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Images (comma-separated URLs)
          </label>
          <input
            type="text"
            name="imageInput"
            value={formData.imageInput}
            onChange={handleChange}
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
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
            placeholder="Enter price (e.g. 25.99)"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Category
          </label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
          >
            <option value="">Select a category</option>
            {categoryLoading ? (
              <option disabled>Loading...</option>
            ) : (
              categories?.map((cat: any) => (
                <option key={cat.id} value={cat.slug || cat.id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
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
