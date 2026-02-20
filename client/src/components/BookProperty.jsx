import { useState } from "react";
import { useAuth } from "../context/Auth.jsx";
import api from "../lib/api";

export default function BookProperty({ property }) {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleBooking = async () => {
        console.log("Starting booking process...");
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            console.log("Token present:", !!token);
            if (!token) {
                alert("Please login to book a property");
                setLoading(false);
                return;
            }

            // 1. Create Order
            console.log("Creating order...");
            const orderRes = await api.post("/payment/order", { amount: 500 }); // Fixed booking amount
            const order = orderRes.data;
            console.log("Order created:", order);

            // Handle Mock Order (Test Mode without Keys)
            if (order.mock) {
                console.log("Handling mock order...");
                if (confirm("Mock Payment Mode: Simulate successful payment?")) {
                    const verifyRes = await api.post("/payment/verify", {
                        razorpay_order_id: order.id,
                        razorpay_payment_id: "pay_mock_" + Date.now(),
                        razorpay_signature: "mock_signature"
                    });
                    console.log("Mock verification result:", verifyRes.data);
                    if (verifyRes.data.success) {
                        alert("Booking Successful! (Mock Payment Verified)");
                    }
                }
                setLoading(false);
                return;
            }

            // 2. Open Razorpay
            console.log("Opening Razorpay with key:", import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_SIJSZT4bHX9sWW");
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_SIJSZT4bHX9sWW",
                amount: order.amount,
                currency: order.currency,
                name: "Real Estate App",
                description: `Booking for ${property.title}`,
                order_id: order.id,
                handler: async function (response) {
                    try {
                        // 3. Verify Payment
                        const verifyRes = await api.post("/payment/verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });
                        if (verifyRes.data.success) {
                            alert("Booking Successful! Payment Verified.");
                        } else {
                            alert("Payment Verification Failed");
                        }
                    } catch (error) {
                        console.error(error);
                        alert("Payment Verification Error");
                    }
                },
                prefill: {
                    name: user?.name || user?.email?.split("@")[0] || "Guest User",
                    email: user?.email || "user@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#10B981"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (error) {
            console.error(error);
            alert("Booking Failed: " + (error.response?.data?.message || "Server Error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-bold text-white mb-2">Interested?</h3>
            <p className="text-gray-400 mb-4">Book this property now with a token advance.</p>
            <button
                onClick={handleBooking}
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
            >
                {loading ? "Processing..." : "Book Now for ₹500"}
            </button>
        </div>
    );
}
