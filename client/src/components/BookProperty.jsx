import { useState } from "react";
import { useAuth } from "../context/Auth.jsx";
import api from "../lib/api";

export default function BookProperty({ property }) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // null | "success" | "error" | "mock_pending"
    const [statusMsg, setStatusMsg] = useState("");
    const { user } = useAuth();

    const handleBooking = async () => {
        setLoading(true);
        setStatus(null);
        setStatusMsg("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setStatus("error");
                setStatusMsg("Please login to book a property.");
                setLoading(false);
                return;
            }

            // Step 1: Create order
            const orderRes = await api.post("/payment/order", { amount: 500 });
            const order = orderRes.data;

            // Step 2: Mock mode fallback
            if (order.mock) {
                setStatus("mock_pending");
                setStatusMsg("Test Mode: No Razorpay keys configured. You can simulate a payment below.");
                setLoading(false);
                return;
            }

            // Step 3: Open Razorpay checkout
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_SIJSZT4bHX9sWW",
                amount: order.amount,
                currency: order.currency,
                name: "NoBrokerNoCry",
                description: `Booking token for ${property.title}`,
                image: "/logo.svg",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyRes = await api.post("/payment/verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        if (verifyRes.data.success) {
                            setStatus("success");
                            setStatusMsg(`Payment verified! ID: ${response.razorpay_payment_id}`);
                        } else {
                            setStatus("error");
                            setStatusMsg("Payment verification failed. Please contact support.");
                        }
                    } catch (err) {
                        setStatus("error");
                        setStatusMsg("Verification error: " + (err.response?.data?.message || err.message));
                    }
                },
                prefill: {
                    name: user?.name || user?.email?.split("@")[0] || "Guest",
                    email: user?.email || "user@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#10B981" },
                modal: {
                    ondismiss: () => {
                        setLoading(false);
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", (response) => {
                setStatus("error");
                setStatusMsg(`Payment failed: ${response.error.description}`);
                setLoading(false);
            });
            rzp.open();
        } catch (error) {
            setStatus("error");
            setStatusMsg("Booking failed: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleMockConfirm = async () => {
        setLoading(true);
        try {
            const orderRes = await api.post("/payment/order", { amount: 500 });
            const order = orderRes.data;
            const verifyRes = await api.post("/payment/verify", {
                razorpay_order_id: order.id,
                razorpay_payment_id: "pay_mock_" + Date.now(),
                razorpay_signature: "mock_signature",
            });
            if (verifyRes.data.success) {
                setStatus("success");
                setStatusMsg("Mock payment confirmed! Your booking is registered.");
            }
        } catch (err) {
            setStatus("error");
            setStatusMsg("Mock confirmation error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl shadow-lg space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">Secure Booking</h3>
                    <p className="text-xs text-gray-400">Powered by Razorpay</p>
                </div>
            </div>

            {/* Pricing breakdown */}
            <div className="bg-gray-800/60 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                    <span>Token Advance</span>
                    <span className="text-white font-medium">₹500</span>
                </div>
                <div className="flex justify-between text-gray-400">
                    <span>Processing Fee</span>
                    <span className="text-emerald-400">FREE</span>
                </div>
                <div className="border-t border-gray-700 pt-2 flex justify-between font-bold text-white">
                    <span>Total Payable</span>
                    <span>₹500</span>
                </div>
            </div>

            {/* Status Banner */}
            {status === "success" && (
                <div className="flex items-start gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p className="text-emerald-400 font-semibold text-sm">Booking Successful! 🎉</p>
                        <p className="text-emerald-300/70 text-xs mt-1">{statusMsg}</p>
                    </div>
                </div>
            )}

            {status === "error" && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p className="text-red-400 font-semibold text-sm">Something went wrong</p>
                        <p className="text-red-300/70 text-xs mt-1">{statusMsg}</p>
                    </div>
                </div>
            )}

            {status === "mock_pending" && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg space-y-3">
                    <p className="text-yellow-400 font-semibold text-sm flex items-center gap-2">
                        <span>⚙️</span> Test / Mock Mode
                    </p>
                    <p className="text-yellow-300/70 text-xs">{statusMsg}</p>
                    <div className="flex gap-2">
                        <button
                            onClick={handleMockConfirm}
                            disabled={loading}
                            className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
                        >
                            {loading ? "Confirming..." : "Simulate Success"}
                        </button>
                        <button
                            onClick={() => { setStatus(null); setStatusMsg(""); }}
                            className="px-4 py-2 border border-gray-600 text-gray-300 text-sm rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Book Button */}
            {status !== "success" && status !== "mock_pending" && (
                <button
                    onClick={handleBooking}
                    disabled={loading}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Processing...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Book this Property — ₹500
                        </>
                    )}
                </button>
            )}

            {status === "success" && (
                <button
                    onClick={() => { setStatus(null); setStatusMsg(""); }}
                    className="w-full py-2 border border-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Book Again
                </button>
            )}

            <p className="text-center text-xs text-gray-500">
                🔒 Secured by Razorpay · 256-bit SSL encryption
            </p>
        </div>
    );
}
