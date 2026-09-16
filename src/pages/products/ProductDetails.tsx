import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, Package, Tag, Star, Boxes } from "lucide-react";
import DummyReviews from "../../pages/products/DummyReviews";
import ProductDetailsSkeleton from "../../skeletons/ProductDetailsSkeleton";
import BreadCrumb from "../../components/BreadCrumb";

interface Category {
  id: number;
  title: string;
  parentId: number | null;
}

interface Product {
  id: number;
  title: string;
  categoryId: number;
  price: string;
  description: string;
  stock: number;
  isFeatured: boolean;
  userId: number;
  status: string;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
  category: Category;
  images: {
    id: number;
    image: string;
  }[];
}

const ProductDetails = () => {
  const { slug } = useParams();
  console.log(slug);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    getProduct();
  }, [slug]);

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `https://ecom-zb9o.vercel.app/api/products/${slug}`,
      );

      setProduct(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <BreadCrumb
          title="Products Details"
          paths={[{ title: "products-details", link: "Product Details" }]}
        />

        <ProductDetailsSkeleton />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          Product not found.
        </div>
      </>
    );
  }

  return (
    <>
      <BreadCrumb
        title="Products Details"
        paths={[{ title: "products-details" }]}
      />
      <section className="container py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top */}
          <div className="bg-white rounded-xl p-10 grid lg:grid-cols-2 gap-14">
            {/* Images */}
            <div className="flex gap-5">
              {/* Thumbnails */}
              <div className="flex flex-col gap-4">
                {product.images.length > 0 ? (
                  product.images.map((img) => (
                    <img
                      key={img.id}
                      src={img.image}
                      alt=""
                      className="w-24 h-24 object-cover rounded-lg border cursor-pointer hover:border-primary-dark"
                    />
                  ))
                ) : (
                  <>
                    <div className="w-24 h-24 rounded-lg border bg-gray-100"></div>
                    <div className="w-24 h-24 rounded-lg border bg-gray-100"></div>
                    <div className="w-24 h-24 rounded-lg border bg-gray-100"></div>
                  </>
                )}
              </div>

              {/* Main Image */}
              <div className="flex-1 bg-gray-100 rounded-xl flex items-center justify-center h-[500px]">
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0].image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <Package size={120} className="text-gray-300" />
                )}
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 text-yellow-500 text-sm">
                ★★★★★
                <span className="text-primary-dark font-josefin font-normal">
                  (22)
                </span>
              </div>

              <h1 className="text-4xl capitalize font-semibold mt-5">
                {product.title}
              </h1>

              <h2 className="text-3xl text-primary-dark font-bold mt-4">
                Rs. {product.price}{" "}
                <span className="text-secondary font-josefin font-normal pl-6 line-through">
                  Rs 1500.00
                </span>
              </h2>

              <p className="mt-6 text-gray-500 font-josefin font-bold leading-8">
                {product.description}
              </p>
              <div className="mt-8 flex items-center gap-5">
                <button className="font-normal font-josefin text-primary-dark px-8 py-3 rounded-md flex items-center gap-2">
                  Add To Cart
                  <ShoppingCart className="ml-3" size={18} />
                </button>
              </div>

              <div className="mt-10 space-y-3 text-sm">
                <div className="flex">
                  <span className="w-28 font-semibold">Category</span>
                  <span className="capitalize text-gray-600">
                    {product.category.title}
                  </span>
                </div>

                <div className="flex">
                  <span className="w-28 font-semibold">Stock</span>
                  <span className="text-gray-600">{product.stock}</span>
                </div>

                <div className="flex">
                  <span className="w-28 font-semibold">Status</span>
                  <span className="capitalize text-gray-600">
                    {product.status}
                  </span>
                </div>

                <div className="flex">
                  <span className="w-28 font-semibold">Featured</span>
                  <span className="text-gray-600">
                    {product.isFeatured ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}

          <div className="container mt-16 rounded-xl shadow-sm p-10">
            <div className="flex gap-10 border-b pb-5">
              <button
                onClick={() => setActiveTab("description")}
                className={`${activeTab === "description" ? "font-semibold border-b-2 border-primary-dark pb-3 transition-all" : ""}`}
              >
                Description
              </button>

              <button
                onClick={() => setActiveTab("additional-information")}
                className={`${activeTab === "additional-information" ? "font-semibold border-b-2 border-primary-dark pb-3 transition-all" : ""}`}
              >
                Additional Info
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`${activeTab === "reviews" ? "font-semibold border-b-2 border-primary-dark pb-3 transition-all" : ""}`}
              >
                Reviews
              </button>
            </div>

            {activeTab === "description" ? (
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-6">
                  Product Description
                </h2>

                <p className="leading-8 text-gray-600">{product.description}</p>

                <div className="grid md:grid-cols-2 gap-5 mt-10">
                  <div className="flex gap-3">
                    <span>✔</span>
                    <span>Premium Quality</span>
                  </div>

                  <div className="flex gap-3">
                    <span>✔</span>
                    <span>Fast Delivery</span>
                  </div>

                  <div className="flex gap-3">
                    <span>✔</span>
                    <span>100% Genuine Product</span>
                  </div>

                  <div className="flex gap-3">
                    <span>✔</span>
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>
            ) : activeTab === "additional-information" ? (
              <div className="mt-10 overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full text-left">
                  <tbody>
                    <tr className="border-b">
                      <th className="w-1/3 bg-gray-50 px-6 py-4 font-semibold">
                        Product ID
                      </th>
                      <td className="px-6 py-4 text-gray-600">#{product.id}</td>
                    </tr>

                    <tr className="border-b">
                      <th className="bg-gray-50 px-6 py-4 font-semibold">
                        Category
                      </th>
                      <td className="px-6 py-4 capitalize text-gray-600">
                        {product.category.title}
                      </td>
                    </tr>

                    <tr className="border-b">
                      <th className="bg-gray-50 px-6 py-4 font-semibold">
                        Price
                      </th>
                      <td className="px-6 py-4 text-gray-600">
                        Rs. {product.price}
                      </td>
                    </tr>

                    <tr className="border-b">
                      <th className="bg-gray-50 px-6 py-4 font-semibold">
                        Stock
                      </th>
                      <td className="px-6 py-4 text-gray-600">
                        {product.stock} Available
                      </td>
                    </tr>

                    <tr className="border-b">
                      <th className="bg-gray-50 px-6 py-4 font-semibold">
                        Status
                      </th>
                      <td className="px-6 py-4 capitalize text-gray-600">
                        {product.status}
                      </td>
                    </tr>

                    <tr className="border-b">
                      <th className="bg-gray-50 px-6 py-4 font-semibold">
                        Featured
                      </th>
                      <td className="px-6 py-4 text-gray-600">
                        {product.isFeatured ? "Yes" : "No"}
                      </td>
                    </tr>

                    <tr className="border-b">
                      <th className="bg-gray-50 px-6 py-4 font-semibold">
                        Added On
                      </th>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                    </tr>

                    <tr>
                      <th className="bg-gray-50 px-6 py-4 font-semibold">
                        Last Updated
                      </th>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(product.updatedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : activeTab === "reviews" ? (
              <DummyReviews />
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
