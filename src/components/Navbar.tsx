import { useState } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import type { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxUser = useSelector((store: RootState) => store.user.value);
  const cartCount = useSelector((store: RootState) => store.cart.value.count);

  const [, setSearchParams] = useSearchParams();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(logout());
    setMenuOpen(false);
    navigate("/");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("searchTerm") as string;
    navigate(`/products?searchTerm=${encodeURIComponent(searchTerm)}`);
    setSearchParams({ searchTerm });
    setSearchOpen(false);
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-3.5 py-2 text-[14px] font-medium transition-colors duration-150 ${
      isActive
        ? "text-primary-dark after:absolute after:inset-x-3.5 after:bottom-0 after:h-[2px] after:rounded-full after:bg-primary"
        : "text-gray-600 hover:text-primary-dark"
    }`;

  const iconButtonClass =
    "grid h-9 w-9 place-items-center rounded-full border border-gray-200 text-gray-600 transition-colors duration-150 hover:border-primary/40 hover:bg-primary/5 hover:text-primary-dark";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">

      <div className="hidden bg-primary-dark md:block">
        <div className="container flex h-9 items-center justify-between text-[12.5px] text-white/70">
          <div className="flex items-center gap-6">
            <a
              href="mailto:support@furnew.com"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Mail size={13} className="text-white/50" />
              support@furnew.com
            </a>
            <a
              href="tel:+9779800000000"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Phone size={13} className="text-white/50" />
              +977 98-0000-0000
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Globe size={13} className="text-white/50" />
              <select
                aria-label="Language"
                defaultValue="EN"
                className="cursor-pointer appearance-none bg-transparent text-[12.5px] text-white/70 outline-none transition-colors hover:text-white [&>option]:text-primary-dark"
              >
                <option value="EN">English</option>
                <option value="NP">नेपाली</option>
              </select>
            </div>

            <span className="h-3.5 w-px bg-white/20" />

            {reduxUser ? (
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1.5">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15 text-white">
                    <User size={11} />
                  </span>
                  <span className="font-medium text-white/90">
                    {reduxUser.firstName}
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-white/60 transition-colors hover:text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 font-medium text-white/80 transition-colors hover:text-white"
              >
                <User size={13} />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100">
        <div className="container flex h-[68px] items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary font-josefin text-[15px] font-bold leading-none text-white">
              F
            </span>
            <span className="font-josefin text-[19px] font-semibold tracking-tight text-primary-dark">
              Furnew
            </span>
          </Link>

       
          <nav className="hidden flex-1 items-center gap-0.5 lg:flex">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>

            {reduxUser?.email && (
              <>
                <NavLink to="/products" className={navLinkClass}>
                  Products
                </NavLink>
                <NavLink to="/carts" className={navLinkClass}>
                  Carts
                </NavLink>
                <NavLink to="/orders" className={navLinkClass}>
                  Orders
                </NavLink>
              </>
            )}

            {reduxUser?.isSeller && (
              <NavLink to="/my-products" className={navLinkClass}>
                My Products
              </NavLink>
            )}

            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

  
          <div className="ml-auto flex items-center gap-2">
            {/* Expandable search */}
            <div className="hidden items-center md:flex">
              {searchOpen ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center rounded-full border border-gray-200 bg-gray-50 pl-4 pr-1 transition-colors focus-within:border-primary/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/15"
                >
                  <input
                    name="searchTerm"
                    autoFocus
                    placeholder="Search furniture..."
                    className="w-[190px] bg-transparent py-2 text-sm text-primary-dark outline-none placeholder:text-gray-400"
                    onBlur={(e) => {
                      if (!e.currentTarget.value) setSearchOpen(false);
                    }}
                  />
                  <button
                    type="submit"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-primary-dark transition-colors hover:bg-primary/10"
                    aria-label="Search"
                  >
                    <Search size={16} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className={iconButtonClass}
                  aria-label="Open search"
                >
                  <Search size={17} />
                </button>
              )}
            </div>

       
            <button className={iconButtonClass} aria-label="Wishlist">
              <Heart size={17} />
            </button>

   
            <Link
              to="/carts"
              className={`relative ${iconButtonClass}`}
              aria-label="Cart"
            >
              <ShoppingCart size={17} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-secondary px-1 text-[10px] font-semibold leading-none text-white">
                  {cartCount}
                </span>
              )}
            </Link>

    
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={`${iconButtonClass} lg:hidden`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="border-b border-gray-100 bg-white px-5 py-4 lg:hidden">
          <form
            onSubmit={handleSubmit}
            className="mb-4 flex items-center rounded-full border border-gray-200 bg-gray-50 pl-4 pr-1 transition-colors focus-within:border-primary/50 focus-within:bg-white"
          >
            <input
              name="searchTerm"
              placeholder="Search furniture..."
              className="w-full bg-transparent py-2 text-sm text-primary-dark outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-primary-dark"
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          </form>

          <nav className="flex flex-col gap-0.5">
            <NavLink
              to="/"
              className={navLinkClass}
              end
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            {reduxUser?.email && (
              <>
                <NavLink
                  to="/products"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Products
                </NavLink>
                <NavLink
                  to="/shop"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Shop
                </NavLink>
                <NavLink
                  to="/blogs"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Blogs
                </NavLink>
                <NavLink
                  to="/carts"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Carts
                </NavLink>
                <NavLink
                  to="/orders"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Orders
                </NavLink>
              </>
            )}

            {reduxUser?.isSeller && (
              <NavLink
                to="/my-products"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                My Products
              </NavLink>
            )}

            <NavLink
              to="/contact"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>
          </nav>

          <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-4 text-[13px] text-gray-500">
              <a
                href="mailto:support@furnew.com"
                className="flex items-center gap-1.5"
              >
                <Mail size={13} className="text-gray-400" />
                support@furnew.com
              </a>
              <a
                href="tel:+9779800000000"
                className="flex items-center gap-1.5"
              >
                <Phone size={13} className="text-gray-400" />
                +977 98-0000-0000
              </a>
            </div>

            {reduxUser ? (
              <div className="flex items-center gap-3 text-[14.5px] font-medium text-gray-700">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary-dark">
                  <User size={13} />
                </span>
                {reduxUser.firstName}
                <button
                  onClick={handleLogout}
                  className="text-gray-400 transition-colors hover:text-primary-dark"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-[14.5px] font-medium text-gray-700 transition-colors hover:text-primary-dark"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary-dark">
                  <User size={13} />
                </span>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;