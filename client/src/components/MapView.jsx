import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const icon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapView({ properties }) {
  const center = properties.length
    ? [properties[0].lat || 0, properties[0].lng || 0]
    : [13.0827, 80.2707]; // Default to Chennai
  return (
    <div className="h-80 w-full rounded-xl overflow-hidden shadow-lg border border-gray-700">
      <MapContainer center={center} zoom={11} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {properties.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
            <Popup>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">{p.title}</div>
                <div className="text-gray-700">{p.location}</div>
                <div className="font-bold text-emerald-600">
                  {p.price.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
