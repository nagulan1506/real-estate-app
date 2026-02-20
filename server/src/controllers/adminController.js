import Property from "../models/Property.js";
import Agent from "../models/Agent.js";
import User from "../models/User.js";

export async function getSummary(req, res) {
  try {
    const [propCount, agentCount, userCount] = await Promise.all([
      Property.countDocuments(),
      Agent.countDocuments(),
      User.countDocuments()
    ]);
    
    return res.json({ propCount, agentCount, userCount });
  } catch (error) {
    console.error("Admin summary error:", error);
    res.status(500).json({ message: "Failed to fetch summary" });
  }
}


