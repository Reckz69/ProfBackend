import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md bg-linear-to-br from-blue-600 to-purple-600 group-hover:shadow-lg transition-all">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold tracking-wide text-gray-900">
              Project
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                X
              </span>
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              About
            </NavLink>

            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-linear-to-br from-blue-500 to-purple-500">
                    {user?.avataar ? (
                      <img
                        src={user.avataar}
                        alt={user.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-xs font-semibold">
                        {user?.username?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.username}
                    </p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-md transition-all duration-300 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-md transition-all duration-300 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
