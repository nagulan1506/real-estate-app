import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

let dbConnected = false;

export async function connectDB() {
  if (!MONGODB_URI) {
    console.warn("MONGODB_URI not set. Running with in-memory data.");
    return false;
  }
  
  try {
    await mongoose.connect(MONGODB_URI);
    dbConnected = true;
    console.log("MongoDB connected");
    return true;
  } catch (err) {
    console.error("MongoDB connection failed. Falling back to in-memory data.", err.message);
    dbConnected = false;
    return false;
  }
}

export function isConnected() {
  return dbConnected;
}

