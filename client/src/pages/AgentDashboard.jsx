import { useEffect, useState } from "react";
import api from "../lib/api.js";
import { useAuth } from "../context/Auth.jsx";

export default function AgentDashboard() {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    title: "",
    type: "Apartment",
    location: "",
    price: "",
    size: "",
    rooms: "",
    lat: "",
    lng: "",
    images: "",
    description: "",
  });

  useEffect(() => {
    api.get("/properties").then((res) => {
      const data = Array.isArray(res.data) ? res.data : [];
      setProperties(data.filter((p) => p.agentId === user?.id || p.agentId?._id === user?.id));
    }).catch(err => {
      console.error("Failed to load properties:", err);
      setProperties([]);
    });
  }, [user]);

  const create = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price), size: Number(form.size), rooms: Number(form.rooms), lat: Number(form.lat), lng: Number(form.lng), images: form.images ? [form.images] : [] };
    const res = await api.post("/properties", payload);
    setProperties((prev) => [res.data, ...prev]);
    setForm({ title: "", type: "Apartment", location: "", price: "", size: "", rooms: "", lat: "", lng: "", images: "", description: "" });
  };

  const remove = async (id) => {
    await api.delete(`/properties/${id}`);
    setProperties((prev) => prev.filter((p) => (p._id || p.id) !== id));
  };

  return (
    <div>
      {!user || user.role !== "agent" ? (
        <div className="p-4 border rounded bg-white text-gray-900 mb-4">Please login as an agent to manage properties.</div>
      ) : null}
      <h1 className="text-2xl font-bold mb-4">Agent Dashboard</h1>
      <form onSubmit={create} className="grid md:grid-cols-3 gap-2 p-4 border rounded bg-white text-gray-900">
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="px-3 py-2 border rounded text-gray-900 bg-white" />
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="px-3 py-2 border rounded text-gray-900 bg-white">
          <option>Apartment</option><option>House</option><option>Condo</option><option>Villa</option><option>Studio</option>
        </select>
        <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" className="px-3 py-2 border rounded text-gray-900 bg-white" />
        <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" type="number" className="px-3 py-2 border rounded text-gray-900 bg-white" />
        <input value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} placeholder="Size" type="number" className="px-3 py-2 border rounded text-gray-900 bg-white" />
        <input value={form.rooms} onChange={(e) => setForm({ ...form, rooms: e.target.value })} placeholder="Rooms" type="number" className="px-3 py-2 border rounded text-gray-900 bg-white" />
        <input value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} placeholder="Latitude" type="number" className="px-3 py-2 border rounded text-gray-900 bg-white" />
        <input value={form.lng} onChange={(e) => setForm({ ...form, lng: e.target.value })} placeholder="Longitude" type="number" className="px-3 py-2 border rounded text-gray-900 bg-white" />
        <input value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} placeholder="Image URL" className="px-3 py-2 border rounded md:col-span-2 text-gray-900 bg-white" />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="px-3 py-2 border rounded md:col-span-3 text-gray-900 bg-white" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded md:col-span-1">Create</button>
      </form>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {properties.map((p) => (
          <div key={p._id || p.id} className="bg-white rounded shadow p-3 text-gray-900">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-gray-600">{p.type} • {p.location}</div>
            <div className="text-sm">${p.price}</div>
            <div className="mt-2 flex gap-2">
              <a className="px-3 py-1 bg-gray-100 rounded" href={`/property/${p._id || p.id}`}>View</a>
              <button onClick={() => remove(p._id || p.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
