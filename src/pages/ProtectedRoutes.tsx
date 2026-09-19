import { useSelector } from "react-redux";
import { type RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes({
  forSeller,
  forAdmin,
}: {
  forSeller?: boolean;
  forAdmin?: boolean;
}) {
  const user = useSelector((store: RootState) => store.user.value);

  if (user) {
    if (forSeller) {
      if (user.isSeller) return <Outlet />;
      return <Navigate to="/" replace />;
    }

    if (forAdmin) {
      if (user.isAdmin) return <Outlet />;
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoutes;