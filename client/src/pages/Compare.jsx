import { useMemo } from "react";

export default function Compare({ list }) {
  const keys = ["type", "location", "price", "size", "rooms"];
  const items = useMemo(() => list || [], [list]);
  if (!items.length) return <div>No properties selected for comparison.</div>;
  const fmt = (k, v) => {
    if (k === "price" && typeof v === "number") return v.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
    if (k === "size" && typeof v === "number") return `${v} sqft`;
    if (k === "rooms" && typeof v === "number") return `${v} BHK`;
    return String(v);
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-900 text-white rounded-xl shadow-xl border border-gray-800">
        <thead>
          <tr>
            <th className="p-3 border border-gray-800 text-left">Attribute</th>
            {items.map((p) => (
              <th key={p.id || p._id} className="p-3 border border-gray-800 text-left">
                <div className="flex items-center gap-3">
                  <img src={p.images?.[0]} alt={p.title} className="h-10 w-16 object-cover rounded-md border border-gray-700" />
                  <div>
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-xs text-gray-400">{p.location}</div>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {keys.map((k) => (
            <tr key={k}>
              <td className="p-3 border border-gray-800 font-semibold capitalize">{k}</td>
              {items.map((p) => (
                <td key={(p.id || p._id) + k} className="p-3 border border-gray-800">
                  {fmt(k, p[k])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
