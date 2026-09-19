import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, Package } from "lucide-react";
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

  return (
    <>
      <BreadCrumb
        title="Product Details"
        paths={[{ title: "Product Details" }]}
      />

      <section className="bg-dark-white py-12">
        <div className="container">
          <div className="grid gap-10 rounded-2xl border border-primary-dark/10 bg-white p-6 sm:p-8 lg:grid-cols-2 lg:p-10">
            <div className="flex gap-4">
              <div className="flex flex-col gap-3">
                {product.images.length > 0 ? (
                  product.images.map((img) => (
                    <img
                      key={img.id}
                      src={img.image}
                      alt=""
                      className="h-20 w-20 cursor-pointer rounded-xl border border-primary-dark/10 object-cover transition-colors hover:border-primary sm:h-24 sm:w-24"
                    />
                  ))
                ) : (
                  <>
                    <div className="h-20 w-20 rounded-xl border border-primary-dark/10 bg-dark-white sm:h-24 sm:w-24" />
                    <div className="h-20 w-20 rounded-xl border border-primary-dark/10 bg-dark-white sm:h-24 sm:w-24" />
                    <div className="h-20 w-20 rounded-xl border border-primary-dark/10 bg-dark-white sm:h-24 sm:w-24" />
                  </>
                )}
              </div>

              <div className="flex h-[420px] flex-1 items-center justify-center overflow-hidden rounded-2xl bg-dark-white sm:h-[500px]">
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0].image}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Package size={120} className="text-primary/30" />
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[13px] text-yellow-500">
                ★★★★★
                <span className="font-josefin text-primary-dark">(22)</span>
              </div>

              <h1 className="mt-4 font-josefin text-[28px] font-bold capitalize leading-tight text-primary-dark sm:text-[32px]">
                {product.title}
              </h1>

              <h2 className="mt-4 flex items-baseline gap-4 font-josefin text-[24px] font-bold text-primary sm:text-[28px]">
                Rs. {product.price}
                <span className="text-[16px] font-normal text-gray-400 line-through">
                  Rs. 1500.00
                </span>
              </h2>

              <p className="mt-5 text-[14.5px] leading-relaxed text-gray-500">
                {product.description}
              </p>

              <div className="mt-8">
                <button className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-[14.5px] font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40">
                  Add to Cart
                  <ShoppingCart size={17} />
                </button>
              </div>

              <div className="mt-8 space-y-3 border-t border-primary-dark/10 pt-6 text-[13.5px]">
                <div className="flex">
                  <span className="w-28 font-semibold text-primary-dark">
                    Category
                  </span>
                  <span className="capitalize text-gray-600">
                    {product.category.title}
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
                    Status
                  </span>
                  <span className="capitalize text-gray-600">
                    {product.status}
                  </span>
                </div>

                <div className="flex">
                  <span className="w-28 font-semibold text-primary-dark">
                    Featured
                  </span>
                  <span className="text-gray-600">
                    {product.isFeatured ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>

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
                  <div className="flex items-center gap-3 text-[14px] text-primary-dark">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary">
                      ✓
                    </span>
                    Premium Quality
                  </div>
                  <div className="flex items-center gap-3 text-[14px] text-primary-dark">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary">
                      ✓
                    </span>
                    Fast Delivery
                  </div>
                  <div className="flex items-center gap-3 text-[14px] text-primary-dark">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary">
                      ✓
                    </span>
                    100% Genuine Product
                  </div>
                  <div className="flex items-center gap-3 text-[14px] text-primary-dark">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary">
                      ✓
                    </span>
                    Easy Returns
                  </div>
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
                        {product.category.title}
                      </td>
                    </tr>

                    <tr className="border-b border-primary-dark/10">
                      <th className="bg-dark-white/60 px-6 py-4 font-semibold text-primary-dark">
                        Price
                      </th>
                      <td className="px-6 py-4 text-gray-600">
                        Rs. {product.price}
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

                    <tr className="border-b border-primary-dark/10">
                      <th className="bg-dark-white/60 px-6 py-4 font-semibold text-primary-dark">
                        Status
                      </th>
                      <td className="px-6 py-4 capitalize text-gray-600">
                        {product.status}
                      </td>
                    </tr>

                    <tr className="border-b border-primary-dark/10">
                      <th className="bg-dark-white/60 px-6 py-4 font-semibold text-primary-dark">
                        Featured
                      </th>
                      <td className="px-6 py-4 text-gray-600">
                        {product.isFeatured ? "Yes" : "No"}
                      </td>
                    </tr>

                    <tr className="border-b border-primary-dark/10">
                      <th className="bg-dark-white/60 px-6 py-4 font-semibold text-primary-dark">
                        Added On
                      </th>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                    </tr>

                    <tr>
                      <th className="bg-dark-white/60 px-6 py-4 font-semibold text-primary-dark">
                        Last Updated
                      </th>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(product.updatedAt).toLocaleDateString()}
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