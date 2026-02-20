import Agent from "../models/Agent.js";
import Property from "../models/Property.js";
import { isConnected } from "../config/database.js";
import { mockAgents, mockProperties } from "../config/mockData.js";

export async function getAgents(req, res) {
  try {
    if (isConnected()) {
      try {
        const agents = await Agent.find();
        // If database is connected but empty, return mock data
        if (agents && agents.length > 0) {
          return res.json(agents);
        }
        // Fall through to mock data if database is empty
      } catch (dbError) {
        console.error("Database query error:", dbError);
        // Fall through to mock data
      }
    }
    
    // Always return mock data if DB not connected or empty
    console.log(`Returning ${mockAgents.length} agents (mock data)`);
    return res.json(mockAgents);
  } catch (error) {
    console.error("Get agents error:", error);
    // Always return mock data on error
    console.log(`Returning ${mockAgents.length} agents (fallback)`);
    return res.json(mockAgents);
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

