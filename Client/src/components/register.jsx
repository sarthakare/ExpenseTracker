import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Ensure this is imported

function RegisterUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate here

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:8000/users/", {
        name,
        email,
        password,
      });
      alert("Registration successful! You can now log in.");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "Registration failed!");
      } else {
        setError("Registration failed! Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Register User</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default RegisterUser;
