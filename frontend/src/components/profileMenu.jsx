import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfileMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logout successful");
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-3">
      <img
        src={user.avataar}
        alt="avatar"
        className="w-9 h-9 rounded-full object-cover"
      />

      <button
        onClick={handleLogout}
        className="text-sm text-red-600 hover:underline"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileMenu;
