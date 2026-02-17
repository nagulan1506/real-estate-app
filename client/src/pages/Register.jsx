import { useState } from "react";
import api from "../lib/api.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post("/auth/register", { name, email, password, role });
      setStatus("Registered. You can login now.");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={submit} className="space-y-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500 placeholder-gray-500" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500 placeholder-gray-500" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500 placeholder-gray-500" />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500">
          <option value="user" className="bg-gray-800">User</option>
          <option value="agent" className="bg-gray-800">Agent</option>
        </select>
        <button className="px-4 py-2 bg-[#87CEEB] text-gray-900 font-bold rounded hover:bg-[#76c2e3] transition">Register</button>
        {status && <div className="text-sm text-green-600">{status}</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}
      </form>
    </div>
  );
}
