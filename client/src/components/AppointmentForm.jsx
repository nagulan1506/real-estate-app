import { useState } from "react";
import api from "../lib/api.js";

export default function AppointmentForm({ property, agent, onDone }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [datetime, setDatetime] = useState("");
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/appointments", { propertyId: property._id || property.id, agentId: agent._id || agent.id, name, email, datetime });
      setStatus(res.data.message || "Appointment scheduled");
      onDone?.();
    } catch (err) {
      setStatus(err.response?.data?.message || "Failed to schedule appointment");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <div className="font-semibold text-white">Schedule viewing with {agent?.name}</div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full px-3 py-2 border rounded text-gray-900 bg-white" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" type="email" className="w-full px-3 py-2 border rounded text-gray-900 bg-white" />
      <input value={datetime} onChange={(e) => setDatetime(e.target.value)} type="datetime-local" className="w-full px-3 py-2 border rounded text-gray-900 bg-white" />
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Schedule</button>
      {status && <div className="text-sm text-gray-600">{status}</div>}
    </form>
  );
}
