import { useAuth } from "../context/AuthContext";

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Welcome, {user?.fullName}
        </p>
      </div>

      <img
        src={user?.avataar}
        alt="avatar"
        className="w-12 h-12 rounded-full object-cover"
      />
    </div>
    
  );
};

export default DashboardHeader;
