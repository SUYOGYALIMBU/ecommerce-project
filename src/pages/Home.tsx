import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productApi, type Product } from "../api";
import {
  ArrowRight,
  Star,
  Sofa,
  Armchair,
  Bed,
  Table2,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import HeroBanner from "../components/HeroBanner";

const categories = [
  { name: "Sofas", icon: Sofa, image: "/images/cat-sofa.jpg" },
  { name: "Chairs", icon: Armchair, image: "/images/cat-chair.jpg" },
  { name: "Tables", icon: Table2, image: "/images/cat-table.jpg" },
  { name: "Beds", icon: Bed, image: "/images/cat-bed.jpg" },
];

const perks = [
  {
    icon: Truck,
    title: "Free delivery",
    text: "Free delivery on orders above Rs. 10,000 inside Kathmandu Valley.",
  },
  {
    icon: ShieldCheck,
    title: "Quality wood",
    text: "Hand-selected hardwood and premium fabric on every piece.",
  },
  {
    icon: RotateCcw,
    title: "Easy returns",
    text: "7-day returns on unused items in original packaging.",
  },
];

const testimonials = [
  {
    name: "Anisha K.",
    role: "Kathmandu",
    text: "The walnut coffee table completely changed our living room. Delivery was on time and assembly was free.",
  },
  {
    name: "Rohan S.",
    role: "Lalitpur",
    text: "Ordered a sofa and two chairs. Quality is far better than the price suggests. Would buy again.",
  },
  {
    name: "Priya M.",
    role: "Seller",
    text: "Seller dashboard is so easy. Listed my handmade chairs in 5 minutes and got my first order that day.",
  },
];

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi
      .list()
      .then((list) => setProducts(list.slice(0, 8)))
      .catch((err) => console.log("Failed to load products", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* 1. HERO */}
      <HeroBanner />

      {/* 2. CATEGORIES */}
      <section className="py-14">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-josefin text-[26px] font-bold text-primary-dark sm:text-[30px]">
                Shop by category
              </h2>
              <p className="mt-1 text-[14px] text-gray-500">
                Pick a room and start exploring.
              </p>
            </div>
            <Link
              to="/products"
              className="hidden items-center gap-1 text-[14px] font-medium text-primary hover:gap-2 sm:flex"
            >
              View all <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.name}
                  to={`/products?category=${encodeURIComponent(c.name)}`}
                  className="group overflow-hidden rounded-2xl border border-primary-dark/10 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="h-32 w-full overflow-hidden bg-dark-white sm:h-40">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-2 p-4">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon size={16} />
                    </span>
                    <span className="font-josefin text-[15px] font-semibold text-primary-dark">
                      {c.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="border-y border-primary-dark/10 bg-dark-white py-14">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-josefin text-[26px] font-bold text-primary-dark sm:text-[30px]">
                Featured products
              </h2>
              <p className="mt-1 text-[14px] text-gray-500">
                Hand-picked pieces from our latest collection.
              </p>
            </div>
            <Link
              to="/products"
              className="hidden items-center gap-1 text-[14px] font-medium text-primary hover:gap-2 sm:flex"
            >
              View all <ArrowRight size={15} />
            </Link>
          </div>

          {loading && (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-[320px] animate-pulse rounded-2xl border border-primary-dark/10 bg-white"
                />
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="mt-8 rounded-2xl border border-primary-dark/10 bg-white p-10 text-center">
              <p className="text-[15px] text-gray-500">
                No products available right now. Please check back soon.
              </p>
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="group overflow-hidden rounded-2xl border border-primary-dark/10 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                >
                  <Link to={`/products/${p._id}`} className="block">
                    <div className="h-56 w-full overflow-hidden bg-dark-white">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  <div className="p-4">
                    {p.category && (
                      <p className="text-[11.5px] font-medium uppercase tracking-wide text-gray-400">
                        {p.category}
                      </p>
                    )}
                    <Link to={`/products/${p._id}`}>
                      <h3 className="mt-1 line-clamp-1 font-josefin text-[15.5px] font-semibold text-primary-dark transition-colors group-hover:text-primary">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="mt-1.5 text-[15px] font-bold text-primary">
                      Rs. {p.price}
                    </p>

                    <Link
                      to={`/products/${p._id}`}
                      className="mt-4 flex h-10 items-center justify-center rounded-xl border border-primary-dark/15 text-[13.5px] font-medium text-primary-dark transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. WHY FURNEW */}
      <section className="py-14">
        <div className="container">
          <h2 className="font-josefin text-[26px] font-bold text-primary-dark sm:text-[30px]">
            Why Furnew
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-primary-dark/10 bg-white p-6 transition-colors hover:border-primary/30"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 font-josefin text-[16px] font-semibold text-primary-dark">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-gray-500">
                    {p.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="border-t border-primary-dark/10 bg-dark-white py-14">
        <div className="container">
          <h2 className="font-josefin text-[26px] font-bold text-primary-dark sm:text-[30px]">
            Loved by our customers
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-primary-dark/10 bg-white p-6"
              >
                <div className="flex items-center gap-1 text-primary">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-gray-600">
                  "{t.text}"
                </p>
                <div className="mt-5 border-t border-primary-dark/10 pt-4">
                  <p className="font-josefin text-[14.5px] font-semibold text-primary-dark">
                    {t.name}
                  </p>
                  <p className="text-[12.5px] text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;