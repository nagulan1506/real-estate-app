import { useState } from "react";
import api from "../lib/api.js";

export default function ContactForm({ property, onDone }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/inquiries", { propertyId: property._id || property.id, name, email, message });
      setStatus(res.data.message || "Inquiry sent");
      onDone?.();
    } catch (err) {
      setStatus(err.response?.data?.message || "Failed to send inquiry");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <div className="font-semibold text-white">Contact about: {property.title}</div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full px-3 py-2 border rounded text-gray-900 bg-white" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" type="email" className="w-full px-3 py-2 border rounded text-gray-900 bg-white" />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" className="w-full px-3 py-2 border rounded text-gray-900 bg-white" />
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Send Inquiry</button>
      {status && <div className="text-sm text-gray-600">{status}</div>}
    </form>
  );
}
