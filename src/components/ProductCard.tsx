import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop";

type ProductImage = {
  id: number;
  image: string;
};

type Product = {
  id: number;
  title: string;
  price: number | string;
  description?: string;
  images?: ProductImage[];
  image?: string;
  category?: {
    id?: number;
    title?: string;
    name?: string;
  };
  stock?: number;
};

const formatPrice = (value: number | string) => {
  const num = typeof value === "string" ? parseFloat(value) : value;

  if (Number.isNaN(num)) return value;

  return num.toLocaleString("en-IN");
};

function ProductCard({ product }: { product: Product }) {
  const addToCart = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Login required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:4000/api/carts",
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Added to cart");
    } catch (error) {
      console.log("Cart error", error);
    }
  };

  const imageSrc =
    product.images?.[0]?.image || product.image || PLACEHOLDER;

  const categoryName =
    product.category?.title || product.category?.name || "";

  return (
    <Link
      key={product.id}
      to={`/products/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary-dark/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary-dark/5"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-dark-white">
        <img
          src={imageSrc}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {categoryName && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-primary-dark backdrop-blur-sm">
            {categoryName}
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-gray-500 shadow-sm backdrop-blur-sm transition-colors hover:bg-primary hover:text-white"
          aria-label="Add to wishlist"
        >
          <Heart size={15} />
        </button>

        {product.stock === 0 && (
          <div className="absolute inset-0 grid place-items-center bg-white/70">
            <span className="rounded-full bg-primary-dark px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 font-josefin text-[15.5px] font-semibold leading-snug text-primary-dark transition-colors group-hover:text-primary">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-yellow-500">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={12} fill="currentColor" />
            ))}
          </div>

          <span className="text-[11.5px] text-gray-400">(22)</span>
        </div>

        {product.description && (
          <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-gray-500">
            {product.description}
          </p>
        )}

        <div className="mt-auto pt-5">
          <p className="font-josefin text-[17px] font-bold text-primary">
            NPR {formatPrice(product.price)}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={(e) => addToCart(e, product.id)}
              disabled={product.stock === 0}
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-[13px] font-medium text-white transition-all duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/40"
            >
              <ShoppingCart size={15} />
              Add to Cart
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary-dark/15 text-primary-dark transition-colors hover:border-primary hover:bg-primary hover:text-white"
              aria-label="Quick view"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;