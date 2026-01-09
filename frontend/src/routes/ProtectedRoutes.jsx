import { Navigate, Outlet} from "react-router-dom";
import {useAuth} from "./context/AuthContext.jsx";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // ⏳ Wait until auth check is complete
  if (loading) {
    return <div>Loading...</div>;
  }

  // ❌ Not logged in → redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow access
  return <Outlet />;
};

export default ProtectedRoute;

