import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
    {
        orderId: { type: String, required: true, unique: true },
        paymentId: { type: String },
        amount: { type: Number, required: true },
        currency: { type: String, default: "INR" },
        status: { type: String, default: "created" }, // created, paid, failed
        mock: { type: Boolean, default: false },
        user: {
            name: String,
            email: String,
            contact: String
        }
    },
    { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
