import React from "react"
import { useForm } from "react-hook-form"
import BreadCrumb from "../components/BreadCrumb"
import axios from "axios"
import { ToastContainer, toast, Bounce } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"

type SignupForm = {
    firstName: string
    lastName: string
    email: string
    password: string
    isSeller: boolean
}

const Signup = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<SignupForm>({
        defaultValues: {
            isSeller: false
        }
    })

    const onSubmit = async (form: SignupForm) => {
        try {
            console.log(form)

            const res = await axios.post(
                "https://ecom-zb9o.vercel.app/api/signup",
                form
            )

            if (res.data.success) {
                toast.success("Account Created Successfully")

                reset()

                setTimeout(() => {
                    navigate("/login")
                }, 1500)
            }
        } catch (error: any) {
            console.log(error)

            if (error?.response?.data?.errors) {
                error.response.data.errors.forEach((err: any) => {
                    toast.error(err.msg)
                })
            } else {
                toast.error(
                    error?.response?.data?.msg || "Signup Failed"
                )
            }
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="light"
                transition={Bounce}
            />

            <BreadCrumb />

            <div className="container mx-auto flex justify-center items-center py-10">
                <div className="border border-[#C2C5E1] p-10 w-[474px]">
                    <form
                        className="flex flex-col items-center gap-2"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h1 className="text-[32px] font-bold font-josefin">
                            Sign Up
                        </h1>

                        <p className="text-[#9096B2] mb-3">
                            Create your account below.
                        </p>

                        <input
                            type="text"
                            placeholder="First Name"
                            className="border p-4 w-full"
                            {...register("firstName", {
                                required: "First Name is required"
                            })}
                        />

                        {errors.firstName && (
                            <p className="text-red-500 self-start text-sm">
                                {errors.firstName.message}
                            </p>
                        )}

                        <input
                            type="text"
                            placeholder="Last Name"
                            className="border p-4 w-full"
                            {...register("lastName", {
                                required: "Last Name is required"
                            })}
                        />

                        {errors.lastName && (
                            <p className="text-red-500 self-start text-sm">
                                {errors.lastName.message}
                            </p>
                        )}

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="border p-4 w-full"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />

                        {errors.email && (
                            <p className="text-red-500 self-start text-sm">
                                {errors.email.message}
                            </p>
                        )}

                        <input
                            type="password"
                            placeholder="Password"
                            className="border p-4 w-full"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters"
                                }
                            })}
                        />

                        {errors.password && (
                            <p className="text-red-500 self-start text-sm">
                                {errors.password.message}
                            </p>
                        )}

                        <div className="w-full flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="seller"
                                {...register("isSeller")}
                            />

                            <label
                                htmlFor="seller"
                                className="text-[#9096B2] cursor-pointer"
                            >
                                Register as Seller
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full h-14 mt-4 text-white font-bold ${
                                isSubmitting
                                    ? "bg-pink-300"
                                    : "bg-secondary"
                            }`}
                        >
                            {isSubmitting
                                ? "Creating Account..."
                                : "Sign Up"}
                        </button>

                        <p className="mt-4 text-[#9096B2]">
                            Already have an account?
                            <Link
                                to="/login"
                                className="ml-1 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup