import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // 1. If we are still checking the token, don't redirect!
  // This keeps the screen blank or shows nothing while we wait for the backend.
  if (loading) return null; 

  // 2. Only redirect if the check is complete and the user is NOT authenticated.
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// CRITICAL: This is the 'default' export Vite is looking for
export default PrivateRoute;