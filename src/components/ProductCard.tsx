import React from "react";
import { ShoppingCart, Heart, ZoomIn, Star } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

// type Categories = {
//     id: number;
//     title: string;
//     parentId: string | number;
//     subCategories: Categories[];
// }

// type ProductDetails = {
//     id: number;
//     title: string;
//     parentId: string | number;
//     subCategories: Categories[];
// }
// : ProductDetails
// : Categories[]
function ProductCard(products) {
  // console.log("Products Products",products)

  const handleAddToCart = (id: number) => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .post("https://ecom-zb9o.vercel.app/api/carts", {
          productId: id,
        }, {
          headers: {
            Authorization:`Bearer ${token}`
          }
        })
        .then((res) => {
          console.log('Res: ',res);
          console.log("Added to cart");
        });
    } else {
      console.log("login required!!");
      
    }
  };

  return (
    <>
      {products.products.map((product) => (
        <Link
          to={`/products/${product.id}`}
          key={product.id}
          className="shadow-xl shadow-black/50 flex items-center gap-2 h-[230px]"
        >
          <div className="p-1 mr-[29px]">
            <img
              height={"197px"}
              width={"284px"}
              src={
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
              }
              alt=""
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-[67px]">
              <p className="font-josefin font-bold text-[18px] text-primary-dark ">
                {product.title}
              </p>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#DE9034]"></div>
                <div className="w-2 h-2 rounded-full bg-[#E60584]"></div>
                <div className="w-2 h-2 rounded-full bg-[#5E37FF]"></div>
              </div>
            </div>
            <div className="flex gap-[9px]">
              <span className="font-josefin text-[14px] ">{product.price}</span>
              <span className=" text-secondary text-[14px] font-josefin line-through">
                $52.00
              </span>
              <span className="text-[14px]">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              </span>
            </div>
            <p className="font-lato font-normal text-[16px] text-[#9295AA] ">
              {product.description}
            </p>
            <div className="flex gap-[31px]">
              <span>
                <ShoppingCart
                  className="h-4 w-4"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product.id);
                  }}
                />
              </span>
              <span>
                <Heart className="h-4 w-4" />
              </span>
              <span>
                <ZoomIn className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default ProductCard;
