// client/src/pages/seller/EditProduct.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axios, fetchProducts } = useAppContext();

  const [form, setForm] = useState({
    name: "",
    price: "",
    offerPrice: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get("/api/product/id", {
          data: { id },
        });
        if (data.success) {
          setForm(data.product);
        } else {
          toast.error("Product not found");
        }
      } catch (err) {
        toast.error("Failed to fetch product");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/product/${id}`, form);
      if (data.success) {
        toast.success("Product updated");
        fetchProducts();
        navigate("/seller/product-list");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Product Name"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Price"
        />
        <input
          name="offerPrice"
          value={form.offerPrice}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Offer Price"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Category"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Description"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
