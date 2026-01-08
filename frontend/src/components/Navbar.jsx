import { Link, NavLink } from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";


const Navbar = () => {

  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          Project<span className="text-blue-500">X</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400"
                : "text-gray-300 hover:text-white transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400"
                : "text-gray-300 hover:text-white transition"
            }
          >
            About
          </NavLink>

 
      <div>
        {isAuthenticated ? (
          <>
            <span className="mr-4">Hello {user.username} !</span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
