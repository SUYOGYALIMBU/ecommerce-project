import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Grid, List } from "lucide-react";
// import { ShoppingCart, Heart, ZoomIn, Star } from 'lucide-react'
// import { Location } from 'react-router-dom'
// import { useLocation } from 'react-router'
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import ProductsListingSkeleton from "../../skeletons/ProductsListingSkeleton";

interface SubCategories {
  createdAt: string;
  id: number;
  parentId: number;
  title: string;
  updatedAt: string;
}

interface Categories {
  id: number;
  title: string;
  parentId: number;
  createdAt: string;
  updatedAt: string;
  subCategories: SubCategories[];
}

function ProductsListing() {
  // const location = useLocation()
  // console.log(location.pathname);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [products, setProducts] = useState([]);
  const [perPage, setPerPage] = useState<number>(25);
  const [categoriesId, setCategoriesId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "";
  // const subCatId = searchParams.get("subcategory") || "";
  // console.log("Categories",categories);
  console.log("product listing search params: ", searchParams);

  // For Categories
  useEffect(() => {
    setIsLoading(true);

    axios.get("https://ecom-zb9o.vercel.app/api/categories").then((res) => {
      setCategories(res.data.data);
      setIsLoading(false);
    });
  }, []);

  // console.log("Listing SearchTerm: ", searchTerm);

  useEffect(() => {
    //   &page=1&sort=createdAt&categoryIds=
    // ?q=${searchTerm}&limit=${perPage}&page=1&sort=createdAt&categoryIds=${categoriesId}
    setIsLoading(true);
    const searchTerm = searchParams.get("q") || "";
    // const subCatId = searchParams.get();
    axios
      .get(
        `https://ecom-zb9o.vercel.app/api/products?q=${searchTerm}&limit=${perPage}&page=1&sort=${sort}&categoryIds=${categoriesId}`,
      )
      .then((res) => {
        setProducts(res.data.data.products);
        // console.log("All Products", res.data.data.products);
        console.log("Categoryid: ", categoriesId);
        setIsLoading(false);
      });
  }, [perPage, categoriesId, searchParams]);

  // Sort Handler

  //  setSearchParams({
  //       ...Object.fromEntries(searchParams),
  //       sort: sortValue,
  //     });

  const sortHandler = (sortValue) => {
    const newParams = new URLSearchParams(searchParams);
    if (sortValue) {
      newParams.set("sort", sortValue);
    } else {
      newParams.delete("sort");
    }
    setSearchParams(newParams);
    console.log("Sort Value: ", sortValue);
  };

  return (
    <>
      <BreadCrumb
        title="Products"
        paths={[{ title: "products", link: "/products" }]}
      />
      <div className="container h-full">
        <div className="flex mb-[100px] mt-[120px] justify-between items-center">
          <div>
            <p className="font-josefin text-primary-dark font-bold text-[22px]">
              Ecommerce Acceories & Fashion item{" "}
            </p>
            <p className="font-lato font-normal text-[12px] text-[#8A8FB9] ">
              About 9,620 results (0.62 seconds){" "}
            </p>
          </div>
          <div className="flex gap-2">
            <span className="font-lato font-normal text-[16px] text-[#3F509E] ">
              Per Page:
            </span>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="border border-black text-[12px] text-[#8A8FB9] cursor-pointer text-[15px] h-[25px]"
            >
              <option value={25}>25</option>
              <option value={4}>4</option>
              <option value={2}>2</option>
            </select>
            <span className="font-lato font-normal">Sort By: </span>
            <select
              // name
              value={sort}
              onChange={(e) => sortHandler(e.target.value)}
              className="border border-black text-[12px] text-[#8A8FB9] cursor-pointer text-[15px] h-[25px]"
            >
              <option value="">Sort By</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="priceAsc">price low to high </option>
              <option value="priceDesc">price hight to low</option>
            </select>
            <span className="font-lato font-normal">
              View:{" "}
              <Grid className="inline-block h-5 cursor-pointer text-primary-dark" />
              <List className="inline-block h-5 cursor-pointer text-primary-dark" />
            </span>
            <input className="border w-40 h-[30px] " />
          </div>
        </div>
        <div className="grid mb-2 grid-cols-10 gap-1">
          <div className="col-span-2 ">
            <p className="font-josefin text-primary-dark text-xl font-bolc">
              Categories
            </p>
            {categories.map((el) => (
              <div key={el.id}>
                <input
                  value={el.id}
                  checked={categoriesId.includes(String(el.id))}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    if (checked) {
                      setCategoriesId((prev) => [...prev, value]);
                    } else {
                      setCategoriesId((prev) =>
                        prev.filter((id) => id != value),
                      );
                    }
                  }}
                  className="border mr-2"
                  id={el.id}
                  type="checkbox"
                />
                <label className="capitalize" htmlFor={el.id}>
                  {el.title}
                </label>
                {/* Subcategory */}
                {el.subCategories.map((sub) => (
                  <div key={sub.id} className="ml-5">
                    <input
                      type="checkbox"
                      value={sub.id}
                      checked={
                        // searchParams.get("subcategory") === String(sub.id)
                        categoriesId.includes(String(sub.id))
                      }
                      onChange={(e) => {
                        const { checked, value } = e.target;

                        if (checked) {
                          setCategoriesId((prev) => [...prev, value]);
                        } else {
                          setCategoriesId((prev) =>
                            prev.filter((id) => id !== value),
                          );
                        }

                        const params = new URLSearchParams(searchParams);
                        params.set("subcategory", value);
                        setSearchParams(params);
                      }}
                      className="mr-2"
                      id={`sub-${sub.id}`}
                    />

                    <label htmlFor={`sub-${sub.id}`}>{sub.title}</label>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="col-span-8">
            {isLoading ? (
              <ProductsListingSkeleton />
            ) : (
              <ProductCard products={products} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsListing;
