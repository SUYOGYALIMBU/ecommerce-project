import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, Package } from "lucide-react";
import DummyReviews from "../../pages/products/DummyReviews";
import ProductDetailsSkeleton from "../../skeletons/ProductDetailsSkeleton";
import BreadCrumb from "../../components/BreadCrumb";

interface Category {
  id: number;
  name: string;
  parentCategoryId: number | null;
}

interface ProductImage {
  id: number;
  image: string;
}

interface Product {
  id: number;
  title: string;
  categoryId: number;
  price: number;
  description: string;
  stock: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  images: ProductImage[];
}

const ProductDetails = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `http://localhost:4000/api/products/${slug}`,
        );

        console.log("Product details:", res.data);

        setProduct(res.data?.data || null);
      } catch (error) {
        console.error("Failed to load product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      getProduct();
    }
  }, [slug]);

  const addToCart = async () => {
    if (!product) return;

    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Login required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:4000/api/carts",
        {
          productId: product.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Added to cart");
    } catch (error) {
      console.error("Cart error:", error);
    }
  };

  if (loading) {
    return (
      <>
        <BreadCrumb
          title="Product Details"
          paths={[{ title: "Product Details" }]}
        />
        <ProductDetailsSkeleton />
      </>
    );
  }

  if (!product) {
    return (
      <div className="container py-20 text-center text-[15px] text-gray-500">
        Product not found.
      </div>
    );
  }

  const hasImages = product.images && product.images.length > 0;

  const currentImage = hasImages
    ? product.images[activeImage]?.image || product.images[0].image
    : "";

  return (
    <>
      <BreadCrumb
        title="Product Details"
        paths={[{ title: "Product Details" }]}
      />

      <section className="bg-dark-white py-12">
        <div className="container">
          <div className="grid gap-10 rounded-2xl border border-primary-dark/10 bg-white p-6 sm:p-8 lg:grid-cols-2 lg:p-10">
            {/* Images */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-3">
                {hasImages ? (
                  product.images.map((img, index) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveImage(index)}
                      className={`overflow-hidden rounded-xl border transition-colors ${
                        activeImage === index
                          ? "border-primary"
                          : "border-primary-dark/10 hover:border-primary"
                      }`}
                    >
                      <img
                        src={img.image}
                        alt={product.title}
                        className="h-20 w-20 object-cover sm:h-24 sm:w-24"
                      />
                    </button>
                  ))
                ) : (
                  <div className="h-20 w-20 rounded-xl border border-primary-dark/10 bg-dark-white sm:h-24 sm:w-24" />
                )}
              </div>

              <div className="flex h-[420px] flex-1 items-center justify-center overflow-hidden rounded-2xl bg-dark-white sm:h-[500px]">
                {hasImages ? (
                  <img
                    src={currentImage}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Package size={120} className="text-primary/30" />
                )}
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[13px] text-yellow-500">
                ★★★★★
                <span className="font-josefin text-primary-dark">(22)</span>
              </div>

              <h1 className="mt-4 font-josefin text-[28px] font-bold capitalize leading-tight text-primary-dark sm:text-[32px]">
                {product.title}
              </h1>

              <h2 className="mt-4 font-josefin text-[24px] font-bold text-primary sm:text-[28px]">
                Rs. {product.price.toLocaleString("en-IN")}
              </h2>

              <p className="mt-5 text-[14.5px] leading-relaxed text-gray-500">
                {product.description}
              </p>

              <div className="mt-8">
                <button
                  onClick={addToCart}
                  disabled={product.stock === 0}
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-[14.5px] font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 disabled:cursor-not-allowed disabled:bg-primary/40"
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  <ShoppingCart size={17} />
                </button>
              </div>

              <div className="mt-8 space-y-3 border-t border-primary-dark/10 pt-6 text-[13.5px]">
                <div className="flex">
                  <span className="w-28 font-semibold text-primary-dark">
                    Category
                  </span>
                  <span className="capitalize text-gray-600">
                    {product.category?.name || "Uncategorized"}
                  </span>
                </div>

                <div className="flex">
                  <span className="w-28 font-semibold text-primary-dark">
                    Stock
                  </span>
                  <span className="text-gray-600">{product.stock}</span>
                </div>

                <div className="flex">
                  <span className="w-28 font-semibold text-primary-dark">
                    Product ID
                  </span>
                  <span className="text-gray-600">#{product.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 rounded-2xl border border-primary-dark/10 bg-white p-6 sm:p-8">
            <div className="flex gap-6 border-b border-primary-dark/10">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-3 text-[14.5px] transition-all ${
                  activeTab === "description"
                    ? "border-b-2 border-primary font-semibold text-primary-dark"
                    : "text-gray-500 hover:text-primary-dark"
                }`}
              >
                Description
              </button>

              <button
                onClick={() => setActiveTab("additional-information")}
                className={`pb-3 text-[14.5px] transition-all ${
                  activeTab === "additional-information"
                    ? "border-b-2 border-primary font-semibold text-primary-dark"
                    : "text-gray-500 hover:text-primary-dark"
                }`}
              >
                Additional Info
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-3 text-[14.5px] transition-all ${
                  activeTab === "reviews"
                    ? "border-b-2 border-primary font-semibold text-primary-dark"
                    : "text-gray-500 hover:text-primary-dark"
                }`}
              >
                Reviews
              </button>
            </div>

            {activeTab === "description" && (
              <div className="mt-8">
                <h2 className="font-josefin text-[20px] font-bold text-primary-dark">
                  Product Description
                </h2>

                <p className="mt-4 text-[14.5px] leading-relaxed text-gray-500">
                  {product.description}
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {[
                    "Premium Quality",
                    "Fast Delivery",
                    "100% Genuine Product",
                    "Easy Returns",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-[14px] text-primary-dark"
                    >
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary">
                        ✓
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "additional-information" && (
              <div className="mt-8 overflow-hidden rounded-xl border border-primary-dark/10">
                <table className="w-full text-left text-[13.5px]">
                  <tbody>
                    <tr className="border-b border-primary-dark/10">
                      <th className="w-1/3 bg-dark-white/60 px-6 py-4 font-semibold text-primary-dark">
                        Product ID
                      </th>
                      <td className="px-6 py-4 text-gray-600">
                        #{product.id}
                      </td>
                    </tr>

                    <tr className="border-b border-primary-dark/10">
                      <th className="bg-dark-white/60 px-6 py-4 font-semibold text-primary-dark">
                        Category
                      </th>
                      <td className="px-6 py-4 capitalize text-gray-600">
                        {product.category?.name || "Uncategorized"}
                      </td>
                    </tr>

                    <tr className="border-b border-primary-dark/10">
                      <th className="bg-dark-white/60 px-6 py-4 font-semibold text-primary-dark">
                        Price
                      </th>
                      <td className="px-6 py-4 text-gray-600">
                        Rs. {product.price.toLocaleString("en-IN")}
                      </td>
                    </tr>

                    <tr className="border-b border-primary-dark/10">
                      <th className="bg-dark-white/60 px-6 py-4 font-semibold text-primary-dark">
                        Stock
                      </th>
                      <td className="px-6 py-4 text-gray-600">
                        {product.stock} Available
                      </td>
                    </tr>

                    <tr>
                      <th className="bg-dark-white/60 px-6 py-4 font-semibold text-primary-dark">
                        Added On
                      </th>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="mt-8">
                <DummyReviews />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;