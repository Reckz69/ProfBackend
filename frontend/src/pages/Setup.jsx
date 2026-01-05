import { useState } from "react";
import { registerUser } from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("coverImage", coverImage);

      const res = await registerUser(formData);
      console.log(res.data);

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl mb-4">Register</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleRegister} className="flex flex-col gap-4">

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
          required
        />

        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Register
        </button>

      </form>
    </div>
  );
};

export default Register;
