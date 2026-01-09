import { useAuth } from "../context/AuthContext";

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-600 mt-0.5">
            Welcome back, <span className="font-semibold text-gray-800">{user?.fullName || 'User'}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-900">{user?.username}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <div className="relative">
          <img
            src={user?.avataar || 'https://via.placeholder.com/48'}
            alt="avatar"
            className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200 shadow-md hover:ring-blue-400 transition-all duration-300"
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
