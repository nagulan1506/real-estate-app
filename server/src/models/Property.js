import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true, enum: ["Apartment", "House", "Condo", "Villa", "Studio"] },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: Number, required: true },
    rooms: { type: Number, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    images: [{ type: String }],
    description: { type: String },
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" }
  },
  { timestamps: true }
);

export default mongoose.models.Property || mongoose.model("Property", PropertySchema);
