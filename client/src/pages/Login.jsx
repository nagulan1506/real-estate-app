import { useState } from "react";
import api from "../lib/api.js";
import { useAuth } from "../context/Auth.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-2">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500 placeholder-gray-500" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500 placeholder-gray-500" />
        <button className="px-4 py-2 bg-[#87CEEB] text-gray-900 font-bold rounded hover:bg-[#76c2e3] transition">Login</button>
        <div className="mt-2 text-right">
          <a href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">Forgot Password?</a>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
      </form>
    </div>
  );
}
