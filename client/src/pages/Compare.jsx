import { useMemo } from "react";

export default function Compare({ list }) {
  const keys = ["type", "location", "price", "size", "rooms"];
  const items = useMemo(() => list || [], [list]);
  if (!items.length) return <div>No properties selected for comparison.</div>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="p-2 border">Attribute</th>
            {items.map((p) => <th key={p.id || p._id} className="p-2 border">{p.title}</th>)}
          </tr>
        </thead>
        <tbody>
          {keys.map((k) => (
            <tr key={k}>
              <td className="p-2 border font-semibold">{k}</td>
              {items.map((p) => <td key={(p.id || p._id) + k} className="p-2 border">{String(p[k])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
