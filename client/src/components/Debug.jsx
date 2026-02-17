import { useState } from "react";
import api from "../lib/api";

export default function Debug() {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const testConnection = async () => {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            // Test 1: Native Fetch to Health Endpoint
            const healthRes = await fetch("https://real-estate-app-h0om.onrender.com/api/health");
            const healthData = await healthRes.json();

            // Test 2: Axios Fetch to Properties
            const apiRes = await api.get("/properties");

            setResult({
                health: { status: healthRes.status, data: healthData },
                api: { status: apiRes.status, dataCount: apiRes.data.length },
                config: apiRes.config.baseURL
            });
        } catch (err) {
            console.error("Debug Error:", err);
            setError({
                message: err.message,
                name: err.name,
                code: err.code,
                config: err.config ? { baseURL: err.config.baseURL, url: err.config.url } : "N/A",
                response: err.response ? { status: err.response.status, data: err.response.data } : "No Response"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 p-4 bg-gray-900 text-white rounded-lg shadow-xl border border-gray-700 max-w-sm text-xs">
            <h3 className="font-bold mb-2">Debugger</h3>
            <button
                onClick={testConnection}
                disabled={loading}
                className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 w-full mb-2"
            >
                {loading ? "Testing..." : "Test Connectivity"}
            </button>

            {result && (
                <div className="text-emerald-400">
                    <p>✅ Health: {result.health.status}</p>
                    <p>✅ API: {result.api.status} ({result.api.dataCount} items)</p>
                    <p>🔗 Base: {result.config}</p>
                </div>
            )}

            {error && (
                <div className="text-red-400 whitespace-pre-wrap">
                    <p>❌ {error.name}: {error.message}</p>
                    <p>⚠️ Code: {error.code}</p>
                    <p>🔗 Target: {error.config?.baseURL}{error.config?.url}</p>
                    <p>📥 Response: {JSON.stringify(error.response, null, 2)}</p>
                </div>
            )}
        </div>
    );
}
