import { useState } from "react";

export default function Filters({ onChange }) {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rooms, setRooms] = useState("");
  const [savedMsg, setSavedMsg] = useState(null);

  const apply = () => {
    onChange({
      location: location || undefined,
      type: type || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      rooms: rooms || undefined,
    });
  };

  const reset = () => {
    setLocation(""); setType(""); setMinPrice(""); setMaxPrice(""); setRooms("");
    onChange({});
  };
  const save = () => {
    const payload = {
      location: location || undefined,
      type: type || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      rooms: rooms || undefined,
    };
    localStorage.setItem("saved_search", JSON.stringify(payload));
    setSavedMsg("Saved!");
    setTimeout(() => setSavedMsg(null), 1200);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 p-4 bg-gray-900 rounded-xl shadow-lg border border-gray-800">
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500 placeholder-gray-500" />
      <select value={type} onChange={(e) => setType(e.target.value)} className="px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500">
        <option value="">Type</option>
        <option>Apartment</option>
        <option>House</option>
      </select>
      <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min Price (₹)" type="number" className="px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500 placeholder-gray-500" />
      <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max Price (₹)" type="number" className="px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500 placeholder-gray-500" />
      <input value={rooms} onChange={(e) => setRooms(e.target.value)} placeholder="Rooms ≥" type="number" className="px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500 placeholder-gray-500" />
      <div className="col-span-full flex gap-3 mt-2">
        <button onClick={apply} className="flex-1 py-2 bg-primary-gradient text-white font-semibold rounded-lg shadow hover:shadow-lg transition border border-transparent">Apply Filters</button>
        <button onClick={reset} className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 transition">Reset</button>
        <button onClick={save} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">Save Search</button>
        {savedMsg && <span className="text-emerald-400 text-sm self-center">{savedMsg}</span>}
      </div>
    </div>
  );
}
