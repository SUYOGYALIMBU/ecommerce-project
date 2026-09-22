import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Layout from "./pages/Layout.tsx";
import ProductsListing from "./pages/products/ProductsListing.tsx";
import ProductDetails from "./pages/products/ProductDetails.tsx";
import MyProducts from "./pages/products/MyProducts.tsx";
import { setUser } from "./redux/features/userSlice.ts";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Cart from "./components/CartPage.tsx";
import Orders from "./components/Orders.tsx";
import ProtectedRoutes from "./pages/ProtectedRoutes.tsx";
import Contact from "./pages/Contact.tsx";
import Shop from "./pages/Shop.tsx";
import NotFound from "./pages/NotFound.tsx";

type JwtPayload = {
  id: number;
  firstName: string;
  email: string;
  isSeller: boolean;
  isAdmin: boolean;
};

const decodeJwt = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJwt(token);
      if (decoded) {
        dispatch(
          setUser({
            firstName: decoded.firstName,
            email: decoded.email,
            role: decoded.isAdmin
              ? "admin"
              : decoded.isSeller
                ? "seller"
                : "user",
            isAdmin: decoded.isAdmin,
            isSeller: decoded.isSeller,
          }),
        );
      } else {
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Signup /> },
        { path: "shop", element: <Shop /> },
        { path: "contact", element: <Contact /> },
        {
          path: "products",
          children: [
            { path: "", element: <ProductsListing /> },
            { path: ":slug", element: <ProductDetails /> },
          ],
        },
        {
          path: "",
          element: <ProtectedRoutes forSeller={true} />,
          children: [{ path: "my-products", element: <MyProducts /> }],
        },
        {
          path: "",
          element: <ProtectedRoutes />,
          children: [
            { path: "carts", element: <Cart /> },
            { path: "orders", element: <Orders /> },
          ],
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      {isLoading ? (
        <p className="text-secondary font-bold mt-[20%] text-4xl text-center">
          Loading...
        </p>
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;