import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Show redirect messages (e.g. "You must log in first")
  const redirectMessage = location.state?.message;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful");
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {redirectMessage && <p>{redirectMessage}</p>}
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
