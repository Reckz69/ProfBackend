import { updateAvatar } from "../api/user";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const res = await updateAvatar(file);
      setUser(res.data.data); // update global user
      toast.success("Avatar updated");
    } catch (err) {
      toast.error("Avatar update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <img
        src={user.avatar}
        className="w-28 h-28 rounded-full object-cover"
      />

      <label className="mt-4 inline-block cursor-pointer text-blue-600">
        {loading ? "Uploading..." : "Change Avatar"}
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleAvatarChange}
        />
      </label>
    </div>
  );
};

export default Profile;
