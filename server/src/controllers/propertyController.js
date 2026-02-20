import Property from "../models/Property.js";

export async function getProperties(req, res) {
  const { location, minPrice, maxPrice, type, rooms } = req.query;
  
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
    res.json(properties);
  } catch (error) {
    console.error("Get properties error:", error);
    res.status(500).json({ message: "Failed to fetch properties" });
  }
}

export async function getPropertyById(req, res) {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    console.error("Get property error:", error);
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

