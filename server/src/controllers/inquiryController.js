import Inquiry from "../models/Inquiry.js";

export async function createInquiry(req, res) {
  const { propertyId, name, email, message } = req.body || {};
  
  if (!propertyId || !name || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await Inquiry.create({ propertyId, name, email, message });
    res.status(201).json({
      message: "Inquiry received",
      data: { propertyId, name, email, message }
    });
  } catch (error) {
    console.error("Inquiry Error:", error);
    res.status(500).json({ message: "Failed to save inquiry" });
  }
}


