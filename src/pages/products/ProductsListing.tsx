import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import BreadCrumb from "../../components/BreadCrumb";
import ProductsListingSkeleton from "../../skeletons/ProductsListingSkeleton";

type Product = {
  id: number;
  title: string;
  description?: string;
  price: number;
  stock: number;
  category?: {
    id: number;
    title?: string;
    name?: string;
  };
  images?: {
    id: number;
    image: string;
  }[];
};

const FURNITURE_CATEGORIES = [
  "Sofas",
  "Chairs",
  "Tables",
  "Beds",
  "Storage",
  "Cabinets",
];

function ProductsListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [perPage, setPerPage] = useState<number>(25);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchInput, setSearchInput] = useState(
    searchParams.get("searchTerm") || searchParams.get("q") || "",
  );

  const sort = searchParams.get("sort") || "";

  const searchTerm =
    searchParams.get("searchTerm") || searchParams.get("q") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const res = await axios.get(
          `http://localhost:4000/api/products?q=${encodeURIComponent(
            searchTerm,
          )}&limit=${perPage}&page=1&sort=${sort}`,
        );

        console.log("Products from my backend:", res.data);

        setProducts(res.data?.data?.products || []);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [perPage, sort, searchTerm]);

  const visibleProducts = activeCategory
    ? products.filter((product) => {
        const categoryName = (
          product.category?.title ||
          product.category?.name ||
          ""
        ).toLowerCase();

        return categoryName.includes(activeCategory.toLowerCase());
      })
    : products;

  const sortHandler = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set("sort", value);
    } else {
      newParams.delete("sort");
    }

    setSearchParams(newParams);
  };

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newParams = new URLSearchParams(searchParams);

    if (searchInput.trim()) {
      newParams.set("searchTerm", searchInput.trim());
    } else {
      newParams.delete("searchTerm");
    }

    setSearchParams(newParams);
  };

  const clearAll = () => {
    setActiveCategory("");
    setSearchInput("");
    setSearchParams({});
  };

  const hasFilters = !!activeCategory || !!searchTerm || !!sort;

  return (
    <>
      <BreadCrumb title="Products" />

      <section className="py-12">
        <div className="container">
          {/* Top section */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left side */}
            <div>
              <h2 className="font-josefin text-2xl font-bold text-primary-dark">
                Furniture Collection
              </h2>

              <p className="mt-1 font-lato text-sm text-gray-500">
                Find the perfect furniture for your home.
              </p>
            </div>

            {/* Search */}
            <form
              onSubmit={searchHandler}
              className="flex w-full max-w-md items-center rounded-md border border-gray-200 bg-white"
            >
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search furniture..."
                className="w-full px-4 py-3 font-lato text-sm outline-none"
              />

              <button
                type="submit"
                className="px-4 text-primary-dark transition hover:text-primary"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Filters */}
          <div className="mt-8 flex flex-col gap-4 rounded-md bg-dark-white p-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 flex items-center gap-2 font-lato text-sm font-semibold text-primary-dark">
                <SlidersHorizontal size={17} />
                Category:
              </span>

              <button
                onClick={() => setActiveCategory("")}
                className={`rounded-full px-4 py-2 font-lato text-sm transition ${
                  !activeCategory
                    ? "bg-primary text-white"
                    : "bg-white text-primary-dark hover:bg-primary hover:text-white"
                }`}
              >
                All
              </button>

              {FURNITURE_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 font-lato text-sm transition ${
                    activeCategory === category
                      ? "bg-primary text-white"
                      : "bg-white text-primary-dark hover:bg-primary hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort + clear */}
            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => sortHandler(e.target.value)}
                className="rounded-md border border-gray-200 bg-white px-3 py-2 font-lato text-sm outline-none"
              >
                <option value="">Sort by</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>

              {hasFilters && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 font-lato text-sm text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Product count */}
          {!isLoading && (
            <div className="mt-6">
              <p className="font-lato text-sm text-gray-500">
                Showing {visibleProducts.length} furniture products
              </p>
            </div>
          )}

          {/* Products */}
          <div className="mt-8">
            {isLoading ? (
              <ProductsListingSkeleton />
            ) : visibleProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <h3 className="font-josefin text-2xl font-bold text-primary-dark">
                  No products found
                </h3>

                <p className="mt-2 font-lato text-gray-500">
                  Try another search or category.
                </p>

                <button
                  onClick={clearAll}
                  className="mt-5 rounded-md bg-primary px-6 py-3 font-lato text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Per page */}
          {!isLoading && visibleProducts.length > 0 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <span className="font-lato text-sm text-gray-500">
                Products per page:
              </span>

              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="rounded-md border border-gray-200 bg-white px-3 py-2 font-lato text-sm outline-none"
              >
                <option value={12}>12</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ProductsListing;