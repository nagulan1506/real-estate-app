import Property from "../models/Property.js";
import { isConnected } from "../config/database.js";
import { mockProperties } from "../config/mockData.js";

export async function getProperties(req, res) {
  const { location, minPrice, maxPrice, type, rooms } = req.query;
  
  try {
    if (isConnected()) {
      try {
        const q = {};
        if (location) q.location = new RegExp(String(location), "i");
        if (type) q.type = String(type);
        if (rooms && !Number.isNaN(Number(rooms))) {
          q.rooms = { $gte: Number(rooms) };
        }
        if (!Number.isNaN(Number(minPrice)) || !Number.isNaN(Number(maxPrice))) {
          q.price = {};
          if (!Number.isNaN(Number(minPrice))) q.price.$gte = Number(minPrice);
          if (!Number.isNaN(Number(maxPrice))) q.price.$lte = Number(maxPrice);
        }

        const properties = await Property.find(q);
        // If database is connected but empty, return mock data
        if (properties && properties.length > 0) {
          return res.json(properties);
        }
        // Fall through to mock data if database is empty
      } catch (dbError) {
        console.error("Database query error:", dbError);
        // Fall through to mock data
      }
    }
    
    // Always return mock data if DB not connected or empty
    let result = [...mockProperties];
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
    console.log(`Returning ${result.length} properties (mock data)`);
    return res.json(result);
  } catch (error) {
    console.error("Get properties error:", error);
    // Always return mock data on error
    console.log(`Returning ${mockProperties.length} properties (fallback)`);
    return res.json(mockProperties);
  }
}

export async function getPropertyById(req, res) {
  try {
    if (isConnected()) {
      const property = await Property.findById(req.params.id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      return res.json(property);
    } else {
      // Fallback to mock data
      const { mockProperties } = await import("../config/mockData.js");
      const property = mockProperties.find((p) => (p._id || p.id) === req.params.id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      return res.json(property);
    }
  } catch (error) {
    console.error("Get property error:", error);
    // Fallback to mock data on error
    const { mockProperties } = await import("../config/mockData.js");
    const property = mockProperties.find((p) => (p._id || p.id) === req.params.id);
    if (property) {
      return res.json(property);
    }
    res.status(404).json({ message: "Property not found" });
  }
}

export async function createProperty(req, res) {
  try {
    const { title, type, location, price, size, rooms, lat, lng, images, description } = req.body;
    const agentId = req.user.id;

    const newProp = await Property.create({
      title,
      type,
      location,
      price,
      size,
      rooms,
      lat,
      lng,
      images,
      description,
      agentId
    });

    return res.status(201).json(newProp);
  } catch (error) {
    console.error("Create Property Error:", error);
    res.status(500).json({ message: "Failed to create property" });
  }
}

export async function updateProperty(req, res) {
  try {
    const updates = req.body || {};
    const updated = await Property.findByIdAndUpdate(req.params.id, updates, { new: true });
    
    if (!updated) {
      return res.status(404).json({ message: "Property not found" });
    }
    
    return res.json(updated);
  } catch (error) {
    console.error("Update property error:", error);
    return res.status(400).json({ message: "Failed to update property" });
  }
}

export async function deleteProperty(req, res) {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: "Property not found" });
    }
    
    return res.json({ message: "Deleted" });
  } catch (error) {
    console.error("Delete property error:", error);
    return res.status(400).json({ message: "Failed to delete property" });
  }
}

