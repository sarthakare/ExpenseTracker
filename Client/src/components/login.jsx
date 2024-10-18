import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Use FormData to send form-encoded data
      const formData = new URLSearchParams();
      formData.append("username", email); // OAuth2PasswordRequestForm expects 'username' as the key
      formData.append("password", password);

      const response = await axios.post(
        "http://localhost:8000/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Set the appropriate header
          },
        }
      );

      localStorage.setItem("token", response.data.access_token);
      alert("Login successful!");
      navigate("/create_project");
    } catch (error) {
      alert("Login failed! " + error);
    }
  };

  return (
    <>
    
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
