import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api.js";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        try {
            const res = await api.post("/auth/reset-password", { token, newPassword: password });
            setMessage(res.data.message);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4 text-white">Reset Password</h1>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-gray-400 mb-1">New Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        type="password"
                        className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500 placeholder-gray-500"
                        required
                    />
                </div>
                <button className="w-full px-4 py-2 bg-[#87CEEB] text-gray-900 font-bold rounded hover:bg-[#76c2e3] transition">
                    Reset Password
                </button>
                {message && <div className="text-green-400 p-2 bg-green-900/20 rounded border border-green-800">{message}</div>}
                {error && <div className="text-red-400 p-2 bg-red-900/20 rounded border border-red-800">{error}</div>}
            </form>
        </div>
    );
}
