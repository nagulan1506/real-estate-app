import Agent from "../models/Agent.js";
import Property from "../models/Property.js";

export async function getAgents(req, res) {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (error) {
    console.error("Get agents error:", error);
    res.status(500).json({ message: "Failed to fetch agents" });
  }
}

export async function getAgentById(req, res) {
  try {
    const agent = await Agent.findById(req.params.id);
    
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    
    const handled = await Property.find({ agentId: agent._id });
    res.json({ ...agent.toObject(), handledProperties: handled });
  } catch (error) {
    console.error("Get agent error:", error);
    res.status(404).json({ message: "Agent not found" });
  }
}

