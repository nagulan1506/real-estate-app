export default function PropertyCard({ property, onContact }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:border-gray-700 transition duration-300 transform hover:-translate-y-1">
      <img src={property.images?.[0]} alt={property.title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg text-white mb-1">{property.title}</h3>
        <p className="text-sm text-gray-400 mb-2">{property.type} • {property.location}</p>
        <p className="text-xl font-bold text-emerald-400">
          {property.price.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
        </p>
        <p className="text-xs text-gray-500 mt-1">Size: {property.size} sqft • Rooms: {property.rooms}</p>
        <div className="mt-4 flex gap-3">
          <a href={`/property/${property._id || property.id}`} className="flex-1 text-center py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 transition">View</a>
          <button onClick={() => onContact(property)} className="flex-1 py-2 bg-secondary-gradient text-gray-900 font-bold rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5">Contact</button>
        </div>
      </div>
    </div>
  );
}
