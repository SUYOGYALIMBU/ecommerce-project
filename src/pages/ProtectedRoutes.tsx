import { Outlet } from "react-router-dom";

function ProtectedRoutes() {
  return <Outlet />;
}

export default ProtectedRoutes;


// import React from "react";
// import { useSelector } from "react-redux";
// import { type RootState } from "../redux/store";
// import { Navigate, Outlet } from "react-router-dom";

// function ProtectedRoutes({
//   forSeller,
//   forAdmin,
// }: {
//   forSeller?: boolean;
//   forAdmin?: boolean;
// }) {
//   const user = useSelector((store: RootState) => store.user.value);

//   if (user) {
//     if (forSeller) {
//       if (user.isSeller) {
//         return <Outlet />;
//       } else {
//         return <Navigate to={"/forbidden"} replace />;
//       }
//     }

//     if (forAdmin) {
//       if (user.isAdmin) {
//         return <Outlet />;
//       } else {
//         return <Navigate to={"/forbidden"} replace />;
//       }
//     }
//     return <Outlet />;
//   } else {
//     return <Navigate to={"/login"} />;
//   }
// }

// export default ProtectedRoutes;


// just for testing 
