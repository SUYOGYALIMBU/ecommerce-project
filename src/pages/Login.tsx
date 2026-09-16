import React from "react";
import { useForm } from "react-hook-form";
import BreadCrumb from "../components/BreadCrumb";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";

type LoginForm = {
  email: string;
  password: string;
};

// type LoginProps = {
//     setLoggedIn: (status: boolean) => void
// }
// { setLoggedIn }: LoginProps
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (form: LoginForm) => {
    try {
      const res = await axios.post(
        "https://ecom-zb9o.vercel.app/api/login",
        form,
      );

      console.log(res.data.user);

      if (res.data.msg) {
        // if (res.data.token) {
        // localStorage.setItem("token", res.data.token)
        // }
        console.log(res.data.user);
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        dispatch(setUser(res.data.user));
        toast.success("Login Successful");
        // setLoggedIn(true)
        if (res.data.user.isAdmin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error: any) {
      console.log(error);

      toast.error(
        error?.response?.data?.msg ||
          error?.response?.data?.message ||
          "Login Failed",
      );
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
        transition={Bounce}
      />

      <BreadCrumb
        title="My Account"
        paths={[
          {
            title: "login",
            link: "/login",
          },
        ]}
      />

      <div className="container mx-auto flex justify-center items-center py-10">
        <div className="border border-[#C2C5E1] p-[50px] w-[474px]">
          <form
            className="flex flex-col items-center gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-[#000000] font-josefin font-bold text-[32px]">
              Login
            </p>

            <p className="font-lato mb-3 text-[#9096B2] text-[17px]">
              Please login using account details below.
            </p>

            <input
              className="border p-4 w-full"
              placeholder="Email Address"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
            />

            {errors.email && (
              <p className="text-red-500 self-start text-sm">
                {errors.email.message}
              </p>
            )}

            <input
              className="border p-4 w-full"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />

            {errors.password && (
              <p className="text-red-500 self-start text-sm">
                {errors.password.message}
              </p>
            )}

            <p className="self-start text-[#9096B2] hover:underline cursor-pointer">
              Forgot your password?
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full cursor-pointer h-14 mt-4 text-white font-bold ${
                isSubmitting ? "bg-pink-300 cursor-not-allowed" : "bg-secondary"
              }`}
            >
              {isSubmitting ? "Logging In..." : "Sign In"}
            </button>

            <p className="mt-4 text-[#9096B2]">
              Don't have an account?
              <Link to="/register" className="ml-1 hover:underline">
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
