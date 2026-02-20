export async function createAppointment(req, res) {
  const { propertyId, agentId, name, email, datetime } = req.body || {};
  
  if (!propertyId || !agentId || !name || !email || !datetime) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  
  res.status(201).json({
    message: "Appointment scheduled",
    data: { propertyId, agentId, name, email, datetime }
  });
}


