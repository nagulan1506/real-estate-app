import Agent from "../models/Agent.js";
import Property from "../models/Property.js";
import { isConnected } from "../config/database.js";
import { mockAgents, mockProperties } from "../config/mockData.js";

export async function getAgents(req, res) {
  try {
    if (isConnected()) {
      const agents = await Agent.find();
      return res.json(agents);
    } else {
      // Fallback to mock data
      return res.json(mockAgents);
    }
  } catch (error) {
    console.error("Get agents error:", error);
    // Fallback to mock data on error
    res.json(mockAgents);
  }
}

export async function getAgentById(req, res) {
  try {
    if (isConnected()) {
      const agent = await Agent.findById(req.params.id);
      
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      const handled = await Property.find({ agentId: agent._id });
      return res.json({ ...agent.toObject(), handledProperties: handled });
    } else {
      // Fallback to mock data
      const agent = mockAgents.find((a) => (a._id || a.id) === req.params.id);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      const handled = mockProperties.filter((p) => agent.properties?.includes(p._id || p.id));
      return res.json({ ...agent, handledProperties: handled });
    }
  } catch (error) {
    console.error("Get agent error:", error);
    // Fallback to mock data on error
    const agent = mockAgents.find((a) => (a._id || a.id) === req.params.id);
    if (agent) {
      const handled = mockProperties.filter((p) => agent.properties?.includes(p._id || p.id));
      return res.json({ ...agent, handledProperties: handled });
    }
    res.status(404).json({ message: "Agent not found" });
  }
}

