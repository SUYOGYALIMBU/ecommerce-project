import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import BreadCrumb from "../../components/BreadCrumb";
import ProductsListingSkeleton from "../../skeletons/ProductsListingSkeleton";

const FURNITURE_CATEGORIES = [
  "Sofas",
  "Chairs",
  "Tables",
  "Beds",
  "Storage",
  "Cabinets",
];

function ProductsListing() {
  const [products, setProducts] = useState<any[]>([]);
  const [perPage, setPerPage] = useState<number>(25);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");

  const sort = searchParams.get("sort") || "";
  const searchTerm =
    searchParams.get("searchTerm") || searchParams.get("q") || "";

  useEffect(() => {
    setSearchInput(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://ecom-zb9o.vercel.app/api/products?q=${searchTerm}&limit=${perPage}&page=1&sort=${sort}`,
      )
      .then((res) => setProducts(res.data.data.products))
      .catch((err) => console.log("Failed to load products", err))
      .finally(() => setIsLoading(false));
  }, [perPage, sort, searchTerm]);

  const visibleProducts = useMemo(() => {
    if (!activeCategory) return products;
    return products.filter((p) => {
      const name = (p.category?.title || "").toLowerCase();
      return name.includes(activeCategory.toLowerCase());
    });
  }, [products, activeCategory]);

  const sortHandler = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set("sort", value);
    else newParams.delete("sort");
    setSearchParams(newParams);
  };

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchInput) newParams.set("searchTerm", searchInput);
    else newParams.delete("searchTerm");
    setSearchParams(newParams);
  };

  const clearAll = () => {
    setActiveCategory("");
    setSearchParams({});
    setSearchInput("");
  };

  const hasFilters = !!activeCategory || !!searchTerm || !!sort;

  return (
    <>
      <BreadCrumb
        title="Furniture Collection"
        paths={[{ title: "Products", link: "/products" }]}
      />

      <section className="bg-dark-white pb-16">
        <div className="container">
          <div className="-mt-6 rounded-2xl border border-primary-dark/10 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="font-josefin text-[26px] font-bold text-primary-dark sm:text-[30px]">
                  Furniture Collection
                </h1>
                <p className="mt-1.5 text-[14px] text-gray-500">
                  Discover furniture designed to make your space feel like home.
                </p>
              </div>

              <form
                onSubmit={searchHandler}
                className="flex items-center gap-2 rounded-full border border-primary-dark/10 bg-dark-white/60 py-1.5 pl-5 pr-1.5 transition-all focus-within:border-primary/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/15 lg:w-[400px]"
              >
                <Search size={16} className="shrink-0 text-gray-400" />
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search for sofas, chairs, tables..."
                  className="min-w-0 flex-1 bg-transparent py-2 text-[14px] text-primary-dark outline-none placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-primary px-5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  Search
                </button>
              </form>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory("")}
              className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                activeCategory === ""
                  ? "border-primary bg-primary text-white"
                  : "border-primary-dark/10 bg-white text-primary-dark hover:border-primary/40 hover:text-primary"
              }`}
            >
              All
            </button>

            {FURNITURE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(cat === activeCategory ? "" : cat)
                }
                className={`rounded-full border px-4 py-2 text-[13px] font-medium capitalize transition-colors ${
                  activeCategory === cat
                    ? "border-primary bg-primary text-white"
                    : "border-primary-dark/10 bg-white text-primary-dark hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-primary-dark/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-[13px] text-gray-500">
              <SlidersHorizontal size={15} className="text-primary" />
              <span>
                {isLoading
                  ? "Loading..."
                  : `Showing ${visibleProducts.length} item${visibleProducts.length === 1 ? "" : "s"}`}
              </span>

              {hasFilters && (
                <button
                  onClick={clearAll}
                  className="ml-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[12px] font-medium text-primary transition-colors hover:bg-primary/15"
                >
                  Clear
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-[13px] text-gray-500">
                Show
                <select
                  value={perPage}
                  onChange={(e) => setPerPage(Number(e.target.value))}
                  className="rounded-lg border border-primary-dark/10 bg-white px-2.5 py-1.5 text-[13px] text-primary-dark outline-none focus:border-primary/50"
                >
                  <option value={25}>25</option>
                  <option value={12}>12</option>
                  <option value={8}>8</option>
                </select>
              </label>

              <label className="flex items-center gap-2 text-[13px] text-gray-500">
                Sort
                <select
                  value={sort}
                  onChange={(e) => sortHandler(e.target.value)}
                  className="rounded-lg border border-primary-dark/10 bg-white px-2.5 py-1.5 text-[13px] text-primary-dark outline-none focus:border-primary/50"
                >
                  <option value="">Default</option>
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                </select>
              </label>
            </div>
          </div>

          <div className="mt-8">
            {isLoading ? (
              <ProductsListingSkeleton />
            ) : visibleProducts.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-primary-dark/15 bg-white py-24 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                  <Search size={22} />
                </div>
                <p className="font-josefin text-[16px] font-semibold text-primary-dark">
                  No products found
                </p>
                <p className="max-w-xs text-[13.5px] text-gray-500">
                  Try clearing filters or searching for something else.
                </p>
                <button
                  onClick={clearAll}
                  className="mt-2 rounded-xl bg-primary px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <ProductCard products={visibleProducts} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductsListing;