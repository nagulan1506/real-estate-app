import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    bio: { type: String },
    avatarUrl: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.Agent || mongoose.model("Agent", AgentSchema);
