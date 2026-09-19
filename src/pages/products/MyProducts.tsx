import { useEffect, useState } from "react";
import axios from "axios";
import { Package, Trash2, Edit3 } from "lucide-react";
import BreadCrumb from "../../components/BreadCrumb";

type Product = {
  id: number;
  title: string;
  price: number | string;
  stock?: number;
  images?: { id: number; image: string }[];
  category?: { title: string };
};

export default function MyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ecom-zb9o.vercel.app/api/products/mine", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const raw =
          res.data?.data?.products ||
          res.data?.data ||
          res.data ||
          [];
        setProducts(Array.isArray(raw) ? raw : []);
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <BreadCrumb
        title="My Products"
        paths={[{ title: "My Products", link: "/my-products" }]}
      />

      <section className="bg-dark-white pb-16">
        <div className="container">
          <div className="-mt-6 rounded-2xl border border-primary-dark/10 bg-white p-6 sm:p-8">
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
          </div>

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
                    {p.category?.title && (
                      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                        {p.category.title}
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
                      <button className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-primary-dark/15 bg-white text-[13px] font-medium text-primary-dark transition-colors hover:border-primary/40 hover:text-primary">
                        <Edit3 size={13} />
                        Edit
                      </button>
                      <button
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