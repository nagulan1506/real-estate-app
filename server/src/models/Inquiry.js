import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
    {
        propertyId: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String },
        status: { type: String, default: "pending" }, // pending, responded
    },
    { timestamps: true }
);

export default mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
