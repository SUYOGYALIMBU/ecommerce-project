import { useForm } from "react-hook-form";
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
        console.log(res.data.user);
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        dispatch(setUser(res.data.user));
        toast.success("Login Successful");
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

      <div className="flex min-h-screen items-center justify-center bg-dark-white px-4 py-14">
        <div className="w-full max-w-[474px] rounded-2xl border border-primary-dark/10 bg-white p-10 shadow-[0_25px_60px_-30px_rgba(62,44,35,0.35)]">
          <form
            className="flex flex-col items-center gap-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Logo mark */}
            <span className="mb-3 grid h-14 w-14 place-items-center rounded-full bg-primary/10">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-josefin text-lg font-bold text-white shadow-lg shadow-primary/30">
                F
              </span>
            </span>

            <p className="font-josefin text-[30px] font-bold leading-tight text-primary-dark">
              Welcome Back
            </p>

            <p className="mb-6 text-center font-lato text-[15px] text-gray-500">
              Please login using account details below.
            </p>

            {/* Email */}
            <div className="w-full">
              <label className="mb-1.5 block text-[13px] font-medium text-primary-dark">
                Email Address
              </label>
              <input
                className="w-full rounded-lg border border-primary-dark/10 bg-dark-white/60 px-4 py-3.5 text-[15px] text-primary-dark outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                placeholder="you@example.com"
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
                <p className="mt-1.5 self-start text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mt-4 w-full">
              <label className="mb-1.5 block text-[13px] font-medium text-primary-dark">
                Password
              </label>
              <input
                className="w-full rounded-lg border border-primary-dark/10 bg-dark-white/60 px-4 py-3.5 text-[15px] text-primary-dark outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1.5 self-start text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mt-3 flex w-full justify-end">
              <p className="cursor-pointer text-[13px] font-medium text-gray-400 transition-colors hover:text-primary hover:underline">
                Forgot your password?
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-6 h-14 w-full rounded-lg text-[15px] font-bold tracking-wide text-white transition-all duration-200 ${
                isSubmitting
                  ? "cursor-not-allowed bg-primary/50"
                  : "cursor-pointer bg-primary shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 active:translate-y-0"
              }`}
            >
              {isSubmitting ? "Logging In..." : "Sign In"}
            </button>

            {/* Divider */}
            <div className="mt-6 flex w-full items-center gap-3">
              <span className="h-px flex-1 bg-primary-dark/10" />
              <span className="text-[12px] uppercase tracking-widest text-gray-400">
                or
              </span>
              <span className="h-px flex-1 bg-primary-dark/10" />
            </div>

            <p className="mt-5 text-[14px] text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="ml-1 font-medium text-primary transition-colors hover:underline"
              >
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