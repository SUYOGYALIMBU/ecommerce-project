import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { Sofa, Lamp, Armchair, Check } from "lucide-react";

type SignupForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isSeller: boolean;
};

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    defaultValues: {
      isSeller: false,
    },
  });

  const onSubmit = async (form: SignupForm) => {
    try {
      console.log(form);

      const res = await axios.post(
        "https://ecom-zb9o.vercel.app/api/signup",
        form,
      );

      if (res.data.success) {
        toast.success("Account Created Successfully");

        reset();

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error: any) {
      console.log(error);

      if (error?.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          toast.error(err.msg);
        });
      } else {
        toast.error(error?.response?.data?.msg || "Signup Failed");
      }
    }
  };

  const inputClass =
    "w-full rounded-xl border border-primary-dark/10 bg-dark-white/60 px-4 py-3.5 text-[15px] text-primary-dark outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20";

  const labelClass = "mb-1.5 block text-[13px] font-medium text-primary-dark";

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
        transition={Bounce}
      />

      <div className="flex min-h-screen items-center justify-center bg-dark-white px-4 py-12">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-primary-dark/10 bg-white shadow-[0_30px_80px_-40px_rgba(62,44,35,0.35)]">
          <div className="grid lg:grid-cols-2">
            {/* ---------- Left illustration panel ---------- */}
            <div className="relative hidden flex-col justify-between overflow-hidden bg-primary-dark p-12 text-white lg:flex">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-secondary/25 blur-3xl"
              />

              <div className="relative">
                <Link to="/" className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary font-josefin text-[15px] font-bold leading-none text-white shadow-lg shadow-primary/30">
                    F
                  </span>
                  <span className="font-josefin text-[19px] font-semibold tracking-tight text-white">
                    Furnew
                  </span>
                </Link>

                <h2 className="mt-14 font-josefin text-[32px] font-bold leading-tight">
                  Create your <br /> Furnew account
                </h2>
                <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/70">
                  Join a community that cares about how a home feels. Save
                  favourites, track orders, and check out faster.
                </p>

                <ul className="mt-8 space-y-3 text-[14px] text-white/80">
                  <li className="flex items-center gap-2.5">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/30 text-white">
                      <Check size={12} />
                    </span>
                    Save your wishlist
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/30 text-white">
                      <Check size={12} />
                    </span>
                    Faster checkout
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/30 text-white">
                      <Check size={12} />
                    </span>
                    Sell your own furniture
                  </li>
                </ul>
              </div>

              <div className="relative mt-12 flex items-center gap-6 text-white/40">
                <Sofa size={40} strokeWidth={1} />
                <Lamp size={40} strokeWidth={1} />
                <Armchair size={40} strokeWidth={1} />
              </div>
            </div>

            {/* ---------- Right form panel ---------- */}
            <div className="p-8 sm:p-12 lg:p-14">
              <div className="mx-auto max-w-md">
                {/* Mobile logo */}
                <div className="mb-8 lg:hidden">
                  <Link to="/" className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary font-josefin text-[15px] font-bold leading-none text-white">
                      F
                    </span>
                    <span className="font-josefin text-[19px] font-semibold tracking-tight text-primary-dark">
                      Furnew
                    </span>
                  </Link>
                </div>

                <h1 className="font-josefin text-[28px] font-bold text-primary-dark">
                  Sign Up
                </h1>
                <p className="mt-2 text-[15px] text-gray-500">
                  Create your account below.
                </p>

                <form
                  className="mt-8 space-y-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>First Name</label>
                      <input
                        type="text"
                        placeholder="Jane"
                        className={inputClass}
                        {...register("firstName", {
                          required: "First Name is required",
                        })}
                      />
                      {errors.firstName && (
                        <p className="mt-1.5 text-sm text-red-500">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={labelClass}>Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className={inputClass}
                        {...register("lastName", {
                          required: "Last Name is required",
                        })}
                      />
                      {errors.lastName && (
                        <p className="mt-1.5 text-sm text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className={inputClass}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>Password</label>
                    <input
                      type="password"
                      placeholder="At least 8 characters"
                      className={inputClass}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                    />
                    {errors.password && (
                      <p className="mt-1.5 text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Seller toggle */}
                  <label
                    htmlFor="seller"
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-primary-dark/10 bg-dark-white/60 p-3.5 transition-colors hover:border-primary/40 hover:bg-primary/5"
                  >
                    <input
                      type="checkbox"
                      id="seller"
                      className="peer sr-only"
                      {...register("isSeller")}
                    />
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-primary-dark/20 bg-white text-transparent transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[14px] font-medium text-primary-dark">
                        Register as Seller
                      </span>
                      <span className="text-[12.5px] text-gray-500">
                        List and sell your own furniture on Furnew.
                      </span>
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`h-14 w-full rounded-xl text-[15px] font-bold tracking-wide text-white transition-all duration-200 ${
                      isSubmitting
                        ? "cursor-not-allowed bg-primary/50"
                        : "cursor-pointer bg-primary shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 active:translate-y-0"
                    }`}
                  >
                    {isSubmitting ? "Creating Account..." : "Sign Up"}
                  </button>

                  <p className="text-center text-[14px] text-gray-500">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-primary transition-colors hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;