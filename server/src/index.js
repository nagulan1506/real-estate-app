import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB, isConnected } from "./config/database.js";
import { seedDB } from "./config/seed.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Real Estate API is running");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", dbConnected: isConnected() });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api", aiRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);

// Initialize database and seed data
async function startServer() {
  await connectDB();
  await seedDB();
  
  app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
