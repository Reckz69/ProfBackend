import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerUser } from "../api/axios";

const ProfileSetup = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [avataar, setAvataar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    if (!state) {
      navigate("/register");
    }
  }, []);

  const handleSubmit = async () => {
    if (!avataar || !coverImage) {
      alert("Please upload both avataar and cover image");
      return;
    }

    const formData = new FormData();

    formData.append("fullName", state.fullName);
    formData.append("username", state.username);
    formData.append("email", state.email);
    formData.append("password", state.password);

    formData.append("avataar", avataar);
    formData.append("coverImage", coverImage);

    await registerUser(formData);

    navigate("/Login");
  };

  return (
    <div>
      <h2>Setup Profile</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvataar(e.target.files[0])}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setCoverImage(e.target.files[0])}
      />

      <button type="button" onClick={handleSubmit}>
        Complete Registration
      </button>
    </div>
  );
};

export default ProfileSetup;
