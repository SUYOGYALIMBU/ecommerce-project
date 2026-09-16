// import React, { useState } from "react"
// import { useForm } from "react-hook-form"
// import BreadCrumb from "../components/BreadCrumb"
// import axios from "axios"

// const Login = () => {
//     const { register, handleSubmit, formState:{errors, isSubmitting} } = useForm()
//     const [form, setForm] = useState({})

//     // { "email": "user@example.com", "password": "password123" }

//   try {
//       const onSubmit = async (form: object) => {
//           console.log(form);
//           const res = await axios.post("https://ecom-zb9o.vercel.app/api/login",form)
//           if (res.data.success.msg) {
              
//           }
  
//       }
//   } catch (error) {
//         console.log(error);
        
//   }

//     return (
//         <>
//             <BreadCrumb />
//             <div className="container shadow-black/50 border-[#C2C5E1] p-[50px] flex justify-center items-center h-[544px] w-[474px] ">
//                 <form className="flex gap-1 p-3 flex-col items-center w-[433px] h-[374px] " onSubmit={handleSubmit(onSubmit)}>
//                     <p className=" text-[#000000] font-josefin font-bold text-[32px] ">Login</p>
//                     <p className="font-lato mb-2 font-normal text-[#9096B2] text-[17px   ] ">Please login using account detail bellow.</p>
//                     {/* <label htmlFor="firstName">First Name:</label> */}
//                     <input
//                         className="border mb-3 p-3.75 w-90 h-[52px] " placeholder="Email Address" type="email"
//                         {...register("email", {
//                             required: true,
//                         })} />
//                     <input className="border mb-3 p-3.75 w-90 h-[52px] " type="password" placeholder="Password" {...register('password', {
//                         required: true,
//                         minLength: { value: 8, message: "Must be atleast 8 characters" }
//                     })} />
//                     <p className="self-start cursor-pointer text-[#9096B2] hover:underline ">Forgot your password?</p>
//                     <button
//                         disabled={isSubmitting}
//                         className={` text-white cursor-pointer mt-3 p-3.75 bg-secondary ${isSubmitting ? "bg-secondary-light" : "" } font-lato font-bold text-[17px] w-90 h-16 `}>{isSubmitting ? "Submitting" : "Sign In"} </button>
//                     <p className="mt-4 font-lato text-[#9096B2] text-[17px] font-normal cursor-pointer hover:underline">Don’t have an Account?Create account</p>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default Login
