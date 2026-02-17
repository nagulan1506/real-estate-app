import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Property from "./models/Property.js";

import Agent from "./models/Agent.js";
import Inquiry from "./models/Inquiry.js";
import Booking from "./models/Booking.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Razorpay from "razorpay";

dotenv.config();

const app = express();
app.use(cors()); // Allow all origins for debugging
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Real Estate API is running");
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "";

let dbConnected = false;
async function connectDB() {
  if (!MONGODB_URI) {
    console.warn("MONGODB_URI not set. Running with in-memory data.");
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI);
    dbConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed. Falling back to in-memory data.", err.message);
    dbConnected = false;
  }
}

await connectDB();

async function seedDB() {
  if (!dbConnected) return;
  const propCount = await Property.countDocuments();
  const agentCount = await Agent.countDocuments();
  if (propCount > 0 || agentCount > 0) return;
  const a1 = await Agent.create({
    name: "Suresh Kumar",
    email: "suresh@example.com",
    phone: "+91-98765-43210",
    bio: "Expert in residential properties across Anna Nagar and T. Nagar.",
  });
  const a2 = await Agent.create({
    name: "Priya Rajan",
    email: "priya@example.com",
    phone: "+91-98989-89898",
    bio: "Specializing in luxury villas and OMR IT corridor apartments.",
  });
  await Property.create([
    {
      title: "Grand Villa in Anna Nagar",
      type: "House",
      location: "Anna Nagar, Chennai",
      price: 65000000,
      size: 4200,
      rooms: 5,
      lat: 13.0850,
      lng: 80.2100,
      images: [
        "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-2251330d666e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Ultra-luxury independent villa with premium finishes and private amenities in the heart of Anna Nagar.",
      agentId: a1._id
    },
    {
      title: "Spacious Villa in Sholinganallur",
      type: "House",
      location: "Sholinganallur, Chennai",
      price: 12000000,
      size: 2200,
      rooms: 3,
      lat: 12.8996,
      lng: 80.2209,
      images: [
        "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-2251330d666e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Modern villa located near the IT corridor with excellent connectivity.",
      agentId: a2._id
    },
    {
      title: "Modern 2BHK Flat near OMR",
      type: "Apartment",
      location: "Thoraipakkam, Chennai",
      price: 8000000,
      size: 1100,
      rooms: 2,
      lat: 12.9400,
      lng: 80.2300,
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Perfect for IT professionals, close to major tech parks.",
      agentId: a2._id
    },
    {
      title: "Independent House in Adyar",
      type: "House",
      location: "Adyar, Chennai",
      price: 30000000,
      size: 2400,
      rooms: 3,
      lat: 13.0012,
      lng: 80.2565,
      images: [
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Traditional style independent house in a quiet, leafy neighborhood.",
      agentId: a1._id
    }
  ]);
  console.log("Seeded Chennai agents and properties");
}

await seedDB();

const properties = [
  {
    id: "p1",
    title: "Grand Villa in Anna Nagar",
    type: "House",
    location: "Anna Nagar, Chennai",
    price: 65000000,
    size: 4200,
    rooms: 5,
    lat: 13.0850,
    lng: 80.2100,
    images: [
      "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-2251330d666e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Ultra-luxury independent villa with premium finishes and private amenities in the heart of Anna Nagar."
  },
  {
    id: "p2",
    title: "Spacious Villa in Sholinganallur",
    type: "House",
    location: "Sholinganallur, Chennai",
    price: 12000000,
    size: 2200,
    rooms: 3,
    lat: 12.8996,
    lng: 80.2209,
    images: [
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-2251330d666e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Modern villa located near the IT corridor with excellent connectivity."
  },
  {
    id: "p3",
    title: "Modern 2BHK Flat near OMR",
    type: "Apartment",
    location: "Thoraipakkam, Chennai",
    price: 8000000,
    size: 1100,
    rooms: 2,
    lat: 12.9400,
    lng: 80.2300,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Perfect for IT professionals, close to major tech parks."
  },
  {
    id: "p4",
    title: "Independent House in Adyar",
    type: "House",
    location: "Adyar, Chennai",
    price: 30000000,
    size: 2400,
    rooms: 3,
    lat: 13.0012,
    lng: 80.2565,
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Traditional style independent house in a quiet, leafy neighborhood."
  },
  {
    id: "p5",
    title: "Premium Condo in Velachery",
    type: "Apartment",
    location: "Velachery, Chennai",
    price: 11000000,
    size: 1450,
    rooms: 3,
    lat: 12.9750,
    lng: 80.2200,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Close to Phoenix Market City, luxury condo with swimming pool."
  },
  {
    id: "p6",
    title: "Heritage Home in Mylapore",
    type: "House",
    location: "Mylapore, Chennai",
    price: 27500000,
    size: 2100,
    rooms: 4,
    lat: 13.0330,
    lng: 80.2680,
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599809275372-b7f55fc585b7?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Cultural heart of the city, heritage home with modern interiors."
  }
];

const agents = [
  {
    id: "a1",
    name: "Suresh Kumar",
    email: "suresh@example.com",
    phone: "+91-98765-43210",
    bio: "Expert in residential properties across Anna Nagar and T. Nagar.",
    properties: ["p1", "p4", "p6"]
  },
  {
    id: "a2",
    name: "Priya Rajan",
    email: "priya@example.com",
    phone: "+91-98989-89898",
    bio: "Specializing in luxury villas and OMR IT corridor apartments.",
    properties: ["p2", "p3", "p5"]
  }
];

function authMiddleware(requiredRole) {
  return (req, res, next) => {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
      req.user = { id: payload.sub, role: payload.role };
      if (requiredRole && payload.role !== requiredRole && payload.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
}

// Filters: location, minPrice, maxPrice, type, rooms
app.get("/api/properties", (req, res) => {
  const { location, minPrice, maxPrice, type, rooms } = req.query;
  if (dbConnected) {
    const q = {};
    if (location) q.location = new RegExp(String(location), "i");
    if (type) q.type = String(type);
    if (rooms && !Number.isNaN(Number(rooms))) q.rooms = { $gte: Number(rooms) };
    if (!Number.isNaN(Number(minPrice)) || !Number.isNaN(Number(maxPrice))) {
      q.price = {};
      if (!Number.isNaN(Number(minPrice))) q.price.$gte = Number(minPrice);
      if (!Number.isNaN(Number(maxPrice))) q.price.$lte = Number(maxPrice);
    }
    Property.find(q).then((list) => res.json(list));
  } else {
    let result = [...properties];
    if (location) {
      result = result.filter((p) => p.location.toLowerCase().includes(String(location).toLowerCase()));
    }
    if (type) {
      result = result.filter((p) => p.type.toLowerCase() === String(type).toLowerCase());
    }
    if (rooms) {
      const r = Number(rooms);
      if (!Number.isNaN(r)) result = result.filter((p) => p.rooms >= r);
    }
    if (minPrice) {
      const m = Number(minPrice);
      if (!Number.isNaN(m)) result = result.filter((p) => p.price >= m);
    }
    if (maxPrice) {
      const m = Number(maxPrice);
      if (!Number.isNaN(m)) result = result.filter((p) => p.price <= m);
    }
    res.json(result);
  }
});

app.get("/api/properties/:id", (req, res) => {
  if (dbConnected) {
    Property.findById(req.params.id).then((p) => {
      if (!p) return res.status(404).json({ message: "Property not found" });
      res.json(p);
    }).catch(() => res.status(404).json({ message: "Property not found" }));
  } else {
    const item = properties.find((p) => p.id === req.params.id);
    if (!item) return res.status(404).json({ message: "Property not found" });
    res.json(item);
  }
});

app.post("/api/properties", authMiddleware("agent"), async (req, res) => {
  try {
    const { title, type, location, price, size, rooms, lat, lng, images, description } = req.body;
    const agentId = req.user.id;

    if (dbConnected) {
      const newProp = await Property.create({
        title, type, location, price, size, rooms, lat, lng, images, description, agentId
      });
      return res.status(201).json(newProp);
    } else {
      const newProp = {
        id: "p" + (properties.length + 1) + Date.now().toString().slice(-4),
        title, type, location, price, size, rooms, lat, lng, images, description, agentId
      };
      properties.push(newProp);
      return res.status(201).json(newProp);
    }
  } catch (error) {
    console.error("Create Property Error:", error);
    res.status(500).json({ message: "Failed to create property" });
  }
});

app.get("/api/agents", (req, res) => {
  if (dbConnected) {
    Agent.find().then((list) => res.json(list));
  } else {
    res.json(agents);
  }
});

app.get("/api/agents/:id", (req, res) => {
  if (dbConnected) {
    Agent.findById(req.params.id).then(async (agent) => {
      if (!agent) return res.status(404).json({ message: "Agent not found" });
      const handled = await Property.find({ agentId: agent._id });
      res.json({ ...agent.toObject(), handledProperties: handled });
    }).catch(() => res.status(404).json({ message: "Agent not found" }));
  } else {
    const agent = agents.find((a) => a.id === req.params.id);
    if (!agent) return res.status(404).json({ message: "Agent not found" });
    const handled = properties.filter((p) => agent.properties.includes(p.id));
    res.json({ ...agent, handledProperties: handled });
  }
});

app.post("/api/inquiries", async (req, res) => {
  const { propertyId, name, email, message } = req.body || {};
  if (!propertyId || !name || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    if (dbConnected) {
      await Inquiry.create({ propertyId, name, email, message });
    } else {
      console.log("[Mock DB] Saved inquiry:", { propertyId, name, email, message });
    }
    // TODO: Send email notification to agent
    res.status(201).json({ message: "Inquiry received", data: { propertyId, name, email, message } });
  } catch (error) {
    console.error("Inquiry Error:", error);
    res.status(500).json({ message: "Failed to save inquiry" });
  }
});

app.post("/api/appointments", (req, res) => {
  const { propertyId, agentId, name, email, datetime } = req.body || {};
  if (!propertyId || !agentId || !name || !email || !datetime) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  res.status(201).json({ message: "Appointment scheduled", data: { propertyId, agentId, name, email, datetime } });
});

app.post("/api/locality-insights", async (req, res) => {
  const { location } = req.body;
  if (!location) return res.status(400).json({ message: "Location is required" });

  if (process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

      const prompt = `Provide a brief, engaging summary (max 3 sentences) about the lifestyle, connectivity, and vibe of living in ${location} for a potential home buyer.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return res.json({ insight: response.text() });
    } catch (error) {
      console.error("Gemini Locality Error:", error.message);
      // Fallback to mock on error
    }
  } else {
    console.log("GEMINI_API_KEY is missing.");
  }

  // Mock response if API key missing or error
  const mockInsights = {
    "Anna Nagar, Chennai": "[Mock] Anna Nagar is a premium residential locality known for its grid-like roads, lush parks (like Tower Park), and excellent social infrastructure including top schools and hospitals. It offers a perfect blend of peaceful living with modern urban conveniences.",
    "Sholinganallur, Chennai": "Sholinganallur is a key IT hub on the OMR corridor, making it ideal for tech professionals. It boasts excellent connectivity to ECR and the city center, with numerous gated communities and proximity to the beach.",
    "Thoraipakkam, Chennai": "Thoraipakkam is a rapidly developing residential area on OMR, favored for its affordability and closeness to major IT parks. It offers good connectivity and a growing number of retail and dining options.",
    "Adyar, Chennai": "Adyar is one of Chennai's most affluent and greenest neighborhoods, blending old-world charm with modern luxury. Home to the Theosophical Society and Elliot's Beach, it offers a serene, culturally rich living experience.",
    "ECR, Chennai": "East Coast Road (ECR) offers a scenic, resort-like lifestyle along the coast, perfect for those seeking luxury villas and weekend getaways. It is less congested but well-connected to the city via the scenic highway."
  };

  res.json({ insight: mockInsights[location] || `${location} is a well-connected area with good residential amenities and easy access to local markets and transport hubs, making it a convenient choice for families.` });
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: "Message is required" });

  // Simplified context for the AI
  const propertyContext = properties.map(p =>
    `${p.title} (${p.type}) in ${p.location} for ₹${p.price.toLocaleString("en-IN")}. ${p.rooms}BHK.`
  ).join("\n");

  if (process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

      const prompt = `You are a helpful real estate assistant. Here is the list of available properties:\n${propertyContext}\n\nUser Question: ${message}\n\nAnswer based on the property list provided. If asked about something not on the list, politely say you don't have that information. Keep answers concise.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return res.json({ reply: response.text() });
    } catch (error) {
      console.error("Gemini Chat Error:", error.message);
    }
  } else {
    console.log("GEMINI_API_KEY is missing for chat.");
  }

  // Basic mock response logic (keyword matching)
  let reply = "I can help you find properties. Try asking about 'villas', 'apartments', or specific locations like 'Anna Nagar'.";
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("villa")) {
    const villas = properties.filter(p => p.type === "House");
    reply = `We have ${villas.length} villas available. For example: ${villas.map(v => v.title).join(", ")}.`;
  } else if (lowerMsg.includes("apartment") || lowerMsg.includes("flat")) {
    const apts = properties.filter(p => p.type === "Apartment");
    reply = `We have ${apts.length} apartments available. Check out: ${apts.map(a => a.title).join(", ")}.`;
  } else if (lowerMsg.includes("anna nagar")) {
    const an = properties.filter(p => p.location.includes("Anna Nagar"));
    reply = `In Anna Nagar, we have: ${an.map(p => p.title).join(", ")}.`;
  } else if (lowerMsg.includes("price") || lowerMsg.includes("cost")) {
    reply = "Our properties range from ₹80 Lakhs to ₹6.5 Crores. What's your budget?";
  }

  res.json({ reply });
});




app.post("/api/payment/order", async (req, res) => {
  const { amount } = req.body;
  if (!amount) return res.status(400).json({ message: "Amount is required" });

  if (!process.env.RAZORPAY_KEY_ID) {
    return res.status(500).json({ message: "Razorpay credentials not configured" });
  }

  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await instance.orders.create(options);
    if (!order) return res.status(500).json({ message: "Some error occured" });

    if (dbConnected) {
      await Booking.create({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        status: "created"
      });
    }

    res.json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/payment/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (razorpay_order_id.startsWith("order_mock_")) {
    console.log("Verifying mock payment");
    if (dbConnected) {
      await Booking.create({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount: 50000,
        status: "paid",
        mock: true
      });
    }
    return res.json({ message: "Mock payment verified", success: true });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  if (!process.env.RAZORPAY_KEY_SECRET) {
    return res.status(500).json({ message: "Razorpay secret missing" });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    if (dbConnected) {
      await Booking.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { paymentId: razorpay_payment_id, status: "paid" },
        { upsert: true }
      );
    }
    res.json({ message: "Payment verified successfully", success: true });
  } else {
    res.status(400).json({ message: "Invalid signature", success: false });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", dbConnected });
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, role } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ message: "Missing required fields" });
  try {
    if (dbConnected) {
      const exists = await User.findOne({ email });
      if (exists) return res.status(409).json({ message: "Email already registered" });
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, passwordHash, role: role || "user" });
      return res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
    } else {
      return res.status(201).json({ id: "temp", name, email, role: role || "user" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: "Missing required fields" });
  try {
    if (dbConnected) {
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: "Invalid credentials" });
      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) return res.status(401).json({ message: "Invalid credentials" });
      const token = jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "7d" });
      return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } else {
      const role = /agent/i.test(email) ? "agent" : "user";
      const token = jwt.sign({ sub: "temp", role }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "1d" });
      return res.json({ token, user: { id: "temp", email, role } });
    }
  } catch (e) {
    return res.status(500).json({ message: "Login failed" });
  }
});

app.post("/api/auth/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const token = crypto.randomBytes(20).toString("hex");
    const expiry = Date.now() + 3600000; // 1 hour

    if (dbConnected) {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      user.resetPasswordToken = token;
      user.resetPasswordExpires = expiry;
      await user.save();
    } else {
      // In-memory fallback (simulated)
      console.log(`[Mock DB] Setting reset token for ${email}: ${token}`);
    }

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetUrl = `${frontendUrl}/reset-password/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset.</p><p>Click this link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`
    };

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
      return res.json({ message: "Password reset email sent" });
    } else {
      console.log("Email credentials not found. Mock email sent:");
      console.log(mailOptions);
      return res.json({ message: "Password reset email sent (mock)" });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Error sending email" });
  }
});

app.post("/api/auth/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ message: "Missing fields" });

  try {
    if (dbConnected) {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) return res.status(400).json({ message: "Invalid or expired token" });

      user.passwordHash = await bcrypt.hash(newPassword, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
    } else {
      // In-memory fallback
      console.log(`[Mock DB] Password reset for token ${token} with new password ${newPassword}`);
    }
    return res.json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(500).json({ message: "Error resetting password" });
  }
});

app.post("/api/properties", authMiddleware("agent"), async (req, res) => {
  const data = req.body || {};
  try {
    if (dbConnected) {
      const created = await Property.create({ ...data, agentId: req.user.id });
      return res.status(201).json(created);
    } else {
      const id = "p" + Date.now();
      const created = { id, ...data, agentId: req.user.id };
      properties.push(created);
      return res.status(201).json(created);
    }
  } catch {
    return res.status(400).json({ message: "Failed to create property" });
  }
});

app.patch("/api/properties/:id", authMiddleware("agent"), async (req, res) => {
  const updates = req.body || {};
  try {
    if (dbConnected) {
      const updated = await Property.findByIdAndUpdate(req.params.id, updates, { new: true });
      if (!updated) return res.status(404).json({ message: "Property not found" });
      return res.json(updated);
    } else {
      const idx = properties.findIndex((p) => p.id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: "Property not found" });
      properties[idx] = { ...properties[idx], ...updates };
      return res.json(properties[idx]);
    }
  } catch {
    return res.status(400).json({ message: "Failed to update property" });
  }
});

app.delete("/api/properties/:id", authMiddleware("agent"), async (req, res) => {
  try {
    if (dbConnected) {
      const deleted = await Property.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Property not found" });
      return res.json({ message: "Deleted" });
    } else {
      const idx = properties.findIndex((p) => p.id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: "Property not found" });
      properties.splice(idx, 1);
      return res.json({ message: "Deleted" });
    }
  } catch {
    return res.status(400).json({ message: "Failed to delete property" });
  }
});

app.get("/api/admin/summary", authMiddleware("admin"), async (req, res) => {
  if (dbConnected) {
    const [propCount, agentCount, userCount] = await Promise.all([
      Property.countDocuments(),
      Agent.countDocuments(),
      User.countDocuments()
    ]);
    return res.json({ propCount, agentCount, userCount });
  } else {
    return res.json({ propCount: properties.length, agentCount: agents.length, userCount: 0 });
  }
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
