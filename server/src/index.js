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

// Debug route to test auth routes
app.get("/api/auth/test", (req, res) => {
  res.json({ message: "Auth routes are working", timestamp: new Date().toISOString() });
});

// 404 handler for debugging
app.use((req, res, next) => {
  if (!req.path.startsWith("/api")) {
    return next();
  }
  console.log(`[404] ${req.method} ${req.path} - Route not found`);
  res.status(404).json({ 
    message: "Route not found", 
    path: req.path,
    method: req.method,
    availableRoutes: [
      "POST /api/auth/register",
      "POST /api/auth/login",
      "GET /api/properties",
      "GET /api/agents"
    ]
  });
});

// Initialize database and seed data
async function startServer() {
  try {
    await connectDB();
    await seedDB();
  } catch (error) {
    console.error("Database initialization error:", error);
    console.log("Server will continue without database connection (using mock data)");
  }
  
  app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}`);
    console.log(`Database connected: ${isConnected()}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}

startServer().catch(console.error);
