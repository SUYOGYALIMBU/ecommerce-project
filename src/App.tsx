import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Layout from "./pages/Layout.tsx";
import ProductsListing from "./pages/products/ProductsListing.tsx";
import ProductDetails from "./pages/products/ProductDetails.tsx";
import axios from "axios";
import { setUser } from "./redux/features/userSlice.ts";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Cart from "./components/CartPage.tsx";
import Orders from "./components/Orders.tsx";
import ProtectedRoutes from "./pages/ProtectedRoutes.tsx";
import Contact from "./pages/Contact.tsx";
import Shop from "./pages/Shop.tsx";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(token ? true : false);

  useEffect(() => {
    if (token) {
      axios
        .get("https://ecom-zb9o.vercel.app/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(setUser(res.data));
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
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
          element: <ProtectedRoutes />,
          children: [
            { path: "/carts", element: <Cart /> },
            { path: "/orders", element: <Orders /> },
          ],
        },
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