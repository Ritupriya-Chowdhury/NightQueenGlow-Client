// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useRole } from "../components/hooks/userROle";


// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ allowedRoles }) => {
  const role = useRole();

  if (!role) {
    // If no user is logged in, redirect to login page
    return <Navigate to="/" />;
  }

  // eslint-disable-next-line react/prop-types
  if (!allowedRoles.includes(role)) {
    // If the user doesn't have permission to access this route
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
