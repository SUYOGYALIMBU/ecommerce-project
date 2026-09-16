import {
  MailIcon,
  ChevronDown,
  PhoneCall,
  User,
  Heart,
  ShoppingCart,
  Search,
} from "lucide-react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/userSlice";
import {} from "../redux/features/cartSlice";
import { useSearchParams } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxUser = useSelector((store: RootState) => store.user.value);
  const cartCount = useSelector((store: RootState) => store.cart.value.count);
  console.log("cart count", cartCount);

  const [setSearchParams] = useSearchParams();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(logout());
    navigate("/");
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("searchTerm") as string;
    navigate(`/products?searchTerm=${encodeURIComponent(searchTerm)}`);
    console.log(searchTerm);

    setSearchParams({
      searchTerm,
    });
  };

  return (
    <>
      <header>
        <div className="bg-primary">
          <div className=" container h-[44px] flex justify-between items-center">
            <div>
              <ul className="flex gap-6">
                <li className="flex gap-1 items-center">
                  <MailIcon size={16} className="text-white" />
                  <span className="text-sm text-white">mail@gmail.com</span>
                </li>
                <li className="flex gap-1 items-center">
                  <PhoneCall size={16} className="text-white" />
                  <span className="text-sm text-white">(12345)67890</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="flex gap-3">
                <li className="flex gap-1 items-center">
                  <span className="text-sm flex items-end text-white">
                    English
                    <ChevronDown size={16} className="text-white" />
                  </span>
                </li>
                <li className="flex gap-1 items-center">
                  <span className="text-sm flex items-end text-white">
                    USD
                    <ChevronDown size={16} className="text-white" />
                  </span>
                </li>
                <li className="flex gap-1 items-center">
                  <NavLink to={"/login"} className="text-white">
                    <span className="text-sm flex items-cente">
                      {reduxUser ? (
                        <>
                          <span className="mr-1">{reduxUser.firstName}</span>
                          <button
                            onClick={handleLogout}
                            className="mr-1 cursor-pointer"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        "Login"
                      )}
                      <User size={16} />
                    </span>
                  </NavLink>
                </li>
                <li className="flex gap-1 items-center">
                  <span className="text-sm flex gap-0.5 items-center text-white">
                    Wishlist
                    <Heart size={16} className="text-white" />
                  </span>
                </li>
                <li className="flex relative gap-1 items-center">
                  <span className="text-sm flex items-end text-white">
                    <ShoppingCart size={16} className="text-white" />
                  </span>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 rounded-full flex justify-center items-center text-xs p-0.5 h-4 w-4 font-bold bg-white text-red-600">
                      {cartCount}
                    </span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container flex items-center justify-between">
          <span className="font-semibold font-josefin text-[34px] cursor-pointer pr-[85px] text-primary-dark">
            <Link to="/">Hekto</Link>
          </span>
          <ul className="flex capitalize gap-[35px]">
            <li className="flex text-primary-dark items-center cursor-pointer">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? "text-secondary" : ""} flex items-center`
                }
              >
                Home
                <ChevronDown size={16} />
              </NavLink>
            </li>
            
            {reduxUser?.email && (
              <>
                <li className="text-primary-dark cursor-pointer">
                  <NavLink
                    className={({ isActive }) =>
                      `${isActive ? "text-secondary" : "text-primary-dark"}`
                    }
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li className="text-primary-dark cursor-pointer">
                  <NavLink
                    className={({ isActive }) =>
                      `${isActive ? "text-secondary" : "text-primary-dark"}`
                    }
                    to="/blogs"
                  >
                    Blogs
                  </NavLink>
                </li>
                <li className="text-primary-dark cursor-pointer">
                  <NavLink
                    className={({ isActive }) =>
                      `${isActive ? "text-secondary" : "text-primary-dark"}`
                    }
                    to="/shop"
                  >
                    Shop
                  </NavLink>
                </li>
                <li className="text-primary-dark cursor-pointer">
                  <NavLink
                    to="/carts"
                    className={({ isActive }) =>
                      `${isActive ? "text-secondary" : "text-primary-dark"}`
                    }
                  >
                    Carts
                  </NavLink>
                </li>
                <li className="text-primary-dark cursor-pointer">
                  <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                      `${isActive ? "text-secondary" : "text-primary-dark"}`
                    }
                  >
                    Orders
                  </NavLink>
                </li>
              </>
            )}

            {reduxUser && reduxUser.isSeller && (
              <>
                <span><NavLink
                className={({ isActive }) =>
                  `${isActive ? "text-secondary" : "text-primary-dark"}`
                }
                to="/my-products"
              >
                My Products
              </NavLink></span>
                
              </>
            )}
            <li className="text-primary-dark">
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "text-secondary" : "text-primary-dark"}`
                }
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <form onSubmit={handleSubmit} className="flex">
            <input
              name="searchTerm"
              // value={searchTerm}
              // onChange={(e)=> setSearchTerm(e.target.value)}
              className="border px-2 w-[250px] border-[#E7E6EF]"
            />
            <button
              type="submit"
              className="bg-secondary cursor-pointer border-[#E7E6EF] h-10 py-2 px-3"
            >
              <Search size={20} className="inline-block text-[#F3F9FF]" />
            </button>
          </form>
        </div>
      </header>
    </>
  );
};

export default Navbar;
