import { useEffect, useState } from "react";
import axios from "axios";
import { Package, Trash2, Edit3, Plus, X } from "lucide-react";
import BreadCrumb from "../../components/BreadCrumb";

type Product = {
  id: number;
  title: string;
  description?: string;
  price: number | string;
  stock?: number;
  categoryId?: number;
  images?: { id: number; image: string }[];
  category?: {
    title?: string;
    name?: string;
  };
};

type FormDataType = {
  title: string;
  description: string;
  price: string;
  stock: string;
  categoryId: string;
};

const emptyForm: FormDataType = {
  title: "",
  description: "",
  price: "",
  stock: "",
  categoryId: "",
};

export default function MyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] =
    useState<FormDataType>(emptyForm);

  const [images, setImages] = useState<FileList | null>(null);

  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:4000/api/products/mine",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const raw =
        res.data?.data?.products ||
        res.data?.data ||
        res.data ||
        [];

      setProducts(Array.isArray(raw) ? raw : []);
    } catch (error) {
      console.error("Failed to load products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddClick = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setImages(null);
    setShowForm(true);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);

    setFormData({
      title: product.title,
      description: product.description || "",
      price: String(product.price),
      stock: String(product.stock ?? 0),
      categoryId: String(product.categoryId ?? ""),
    });

    setImages(null);
    setShowForm(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (editingProduct) {
        await axios.put(
          `http://localhost:4000/api/products/${editingProduct.id}`,
          {
            title: formData.title,
            description: formData.description,
            price: Number(formData.price),
            stock: Number(formData.stock),
            categoryId: Number(formData.categoryId),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Product updated successfully!");
      } else {
        const data = new FormData();

        data.append("title", formData.title);
        data.append(
          "description",
          formData.description
        );
        data.append("price", formData.price);
        data.append("stock", formData.stock);
        data.append(
          "categoryId",
          formData.categoryId
        );

        if (images) {
          Array.from(images).forEach((image) => {
            data.append("photos", image);
          });
        }

        await axios.post(
          "http://localhost:4000/api/products",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Product added successfully!");
      }

      setShowForm(false);
      setEditingProduct(null);
      setFormData(emptyForm);
      setImages(null);

      await fetchProducts();
    } catch (error: any) {
      console.error("Save product error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to save product"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:4000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== id
        )
      );

      alert("Product deleted successfully!");
    } catch (error: any) {
      console.error("Delete product error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  return (
    <>
      <BreadCrumb
        title="My Products"
        paths={[
          {
            title: "My Products",
            link: "/my-products",
          },
        ]}
      />

      <section className="bg-dark-white pb-16">
        <div className="container">

          <div className="-mt-6 rounded-2xl border border-primary-dark/10 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Package size={22} />
                </span>

                <div>
                  <h1 className="font-josefin text-[24px] font-bold text-primary-dark">
                    My Products
                  </h1>

                  <p className="mt-0.5 text-[13.5px] text-gray-500">
                    Manage the products you've listed on Furnew.
                  </p>
                </div>
              </div>

              <button
                onClick={handleAddClick}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-[13px] font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                <Plus size={16} />
                Add Product
              </button>
            </div>
          </div>

          {showForm && (
            <div className="mt-8 rounded-2xl border border-primary-dark/10 bg-white p-6 sm:p-8">

              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="font-josefin text-[20px] font-bold text-primary-dark">
                    {editingProduct
                      ? "Edit Product"
                      : "Add Product"}
                  </h2>

                  <p className="mt-1 text-[13px] text-gray-500">
                    {editingProduct
                      ? "Update your product information."
                      : "Add a new product to your store."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-primary-dark/10 text-gray-500 hover:bg-gray-50"
                >
                  <X size={17} />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-5 md:grid-cols-2"
              >

                <div>
                  <label className="mb-2 block text-[13px] font-medium text-primary-dark">
                    Product Title
                  </label>

                  <input
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter product title"
                    className="h-11 w-full rounded-xl border border-primary-dark/15 px-4 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[13px] font-medium text-primary-dark">
                    Category ID
                  </label>

                  <input
                    required
                    type="number"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    placeholder="Example: 1"
                    className="h-11 w-full rounded-xl border border-primary-dark/15 px-4 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[13px] font-medium text-primary-dark">
                    Price
                  </label>

                  <input
                    required
                    type="number"
                    min="0"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className="h-11 w-full rounded-xl border border-primary-dark/15 px-4 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[13px] font-medium text-primary-dark">
                    Stock
                  </label>

                  <input
                    required
                    type="number"
                    min="0"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Enter stock"
                    className="h-11 w-full rounded-xl border border-primary-dark/15 px-4 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-[13px] font-medium text-primary-dark">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    rows={4}
                    className="w-full rounded-xl border border-primary-dark/15 px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>

                {!editingProduct && (
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-[13px] font-medium text-primary-dark">
                      Product Images
                    </label>

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) =>
                        setImages(e.target.files)
                      }
                      className="w-full rounded-xl border border-primary-dark/15 p-3 text-sm"
                    />

                    <p className="mt-2 text-[11px] text-gray-400">
                      You can select multiple images.
                    </p>
                  </div>
                )}

                <div className="flex gap-3 md:col-span-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="h-11 rounded-xl border border-primary-dark/15 px-5 text-[13px] font-medium text-primary-dark hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="h-11 rounded-xl bg-primary px-6 text-[13px] font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
                  >
                    {saving
                      ? "Saving..."
                      : editingProduct
                      ? "Save Changes"
                      : "Add Product"}
                  </button>
                </div>

              </form>
            </div>
          )}

          {loading && (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-[340px] animate-pulse rounded-2xl border border-primary-dark/10 bg-white"
                />
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-primary-dark/15 bg-white py-24 text-center">

              <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                <Package size={22} />
              </div>

              <p className="font-josefin text-[16px] font-semibold text-primary-dark">
                You haven't listed any products yet
              </p>

              <p className="max-w-xs text-[13.5px] text-gray-500">
                Start selling by adding your first product.
              </p>

              <button
                onClick={handleAddClick}
                className="mt-2 flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[13px] font-semibold text-white"
              >
                <Plus size={15} />
                Add Product
              </button>
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {products.map((p) => (
                <div
                  key={p.id}
                  className="group overflow-hidden rounded-2xl border border-primary-dark/10 bg-white transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >

                  <div className="aspect-square w-full overflow-hidden bg-dark-white">
                    <img
                      src={
                        p.images?.[0]?.image ||
                        "https://placehold.co/400x400/F4E4D8/3E2C23?text=No+Image"
                      }
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">

                    {(p.category?.title ||
                      p.category?.name) && (
                      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                        {p.category.title ||
                          p.category.name}
                      </p>
                    )}

                    <h3 className="mt-1 line-clamp-2 font-josefin text-[15px] font-semibold text-primary-dark">
                      {p.title}
                    </h3>

                    <p className="mt-2 font-josefin text-[15px] font-bold text-primary">
                      NPR {p.price}
                    </p>

                    {typeof p.stock === "number" && (
                      <p className="mt-1 text-[12px] text-gray-400">
                        Stock: {p.stock}
                      </p>
                    )}

                    <div className="mt-4 flex items-center gap-2">

                      <button
                        onClick={() =>
                          handleEditClick(p)
                        }
                        className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-primary-dark/15 bg-white text-[13px] font-medium text-primary-dark transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        <Edit3 size={13} />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(p.id)
                        }
                        className="grid h-10 w-10 place-items-center rounded-xl border border-primary-dark/15 text-gray-500 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                        aria-label="Delete"
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}