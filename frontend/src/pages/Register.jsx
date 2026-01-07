import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleNext = () => {
    navigate("/setup-profile", {
      state: formData, // pass data to next page
    });
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
      />

      <input
        placeholder="Username"
        onChange={(e) =>
          setFormData({ ...formData, username: e.target.value })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />

      {/* ONLY navigation */}
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Register;
