import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Link, useParams, useLocation } from "react-router-dom";
import api from "./lib/api.js";
import Filters from "./components/Filters.jsx";
import PropertyCard from "./components/PropertyCard.jsx";
import MapView from "./components/MapView.jsx";
import ContactForm from "./components/ContactForm.jsx";
import AppointmentForm from "./components/AppointmentForm.jsx";
import BookProperty from "./components/BookProperty.jsx";
import { useAuth } from "./context/Auth.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AgentDB from "./pages/AgentDashboard.jsx";
import Compare from "./pages/Compare.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import About from "./pages/About.jsx";
import AIChatBubble from "./components/AIChatBubble.jsx";
import Debug from "./components/Debug.jsx";
import logo from "./assets/logo.svg";
import Modal from "./components/Modal.jsx";

function Layout({ children }) {
  return (
    <div>
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl tracking-wide">
            <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
            NoBrokerNoCry
          </Link>
          <nav className="flex gap-6 items-center font-medium">
            <Link to="/" className="hover:text-gray-200 transition">Listings</Link>
            <Link to="/agents" className="hover:text-gray-200 transition">Agents</Link>
            <Link to="/compare" className="hover:text-gray-200 transition">Compare</Link>
            <Link to="/about" className="hover:text-gray-200 transition">About</Link>
            <AuthBar />
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8 min-h-[80vh]">{children}</main>
      <AIChatBubble />
      <footer className="bg-gray-900 text-white py-8 text-center text-sm">
        <div className="mb-2 bg-secondary-gradient bg-clip-text text-transparent font-bold text-lg inline-block">
          Discover Your Dream Home
        </div>
        <div>© {new Date().getFullYear()} NoBrokerNoCry. crafted with love in Chennai.</div>
      </footer>
    </div>
  );
}

function AuthBar() {
  const { user, logout } = useAuth();
  if (!user) return (
    <>
      <Link to="/login" className="hover:text-gray-200 transition">Login</Link>
      <Link to="/register" className="bg-[#87CEEB] text-gray-900 font-bold px-4 py-2 rounded-full hover:shadow-lg transition transform hover:-translate-y-0.5">Register</Link>
    </>
  );
  return (
    <>
      {user.role === "agent" && <Link to="/agent" className="hover:text-gray-200 transition">Dashboard</Link>}
      <span className="text-sm opacity-90">Hi, {user.name || user.email}</span>
      <button onClick={logout} className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition">Logout</button>
    </>
  );
}

function ListingsPage() {
  const [filters, setFilters] = useState({});
  const [properties, setProperties] = useState([]);
  const [contactFor, setContactFor] = useState(null);
  const [compare, setCompare] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showCalc, setShowCalc] = useState(false);
  const [calc, setCalc] = useState({ rent: "", price: "", appreciation: "5", years: "10" });
  const [savedApplied, setSavedApplied] = useState(false);

  const query = useMemo(() => {
    const params = new URLSearchParams(filters);
    const q = params.toString();
    return q ? `?${q}` : "";
  }, [filters]);

  useEffect(() => {
    api.get(`/properties${query}`)
      .then((res) => setProperties(
        (Array.isArray(res.data) ? res.data : []).filter(
          (p) => Array.isArray(p.images) && p.images.length > 0 && typeof p.images[0] === "string" && p.images[0].trim().length > 0
        )
      ))
      .catch(err => {
        console.error(err);
        setProperties([]); // Ensure properties is always an array
        alert("Failed to load listings: " + (err.response?.data?.message || err.message));
      });
  }, [query]);

  useEffect(() => {
    const stored = localStorage.getItem("compare_list");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setCompare(parsed);
      } catch {}
    }
    try {
      const fav = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (Array.isArray(fav)) setFavorites(fav);
    } catch {}
    try {
      const saved = JSON.parse(localStorage.getItem("saved_search") || "{}");
      if (saved && Object.keys(saved).length) {
        setFilters(saved);
        setSavedApplied(true);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("compare_list", JSON.stringify(compare));
    } catch {}
  }, [compare]);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const toggleFavorite = (p) => {
    setFavorites((prev) => {
      const id = p._id || p.id;
      const exists = prev.some((x) => (x._id || x.id) === id);
      if (exists) return prev.filter((x) => (x._id || x.id) !== id);
      return [...prev, p];
    });
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Filters onChange={setFilters} />
          </div>
        </div>
        {savedApplied && (
          <div className="p-2 bg-emerald-900/20 text-emerald-300 rounded border border-emerald-800">
            Saved search applied. <button className="underline" onClick={() => { setFilters({}); localStorage.removeItem("saved_search"); setSavedApplied(false); }}>Clear</button>
          </div>
        )}
        <MapView properties={properties} />
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400 flex gap-4 items-center">
            <span>Compare: {compare.length}</span>
            <a href="/favorites" className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-white">Favorites: {favorites.length}</a>
          </div>
          <div className="flex gap-2">
            <Link to="/compare" state={{ list: compare }} className="px-3 py-2 bg-gray-100 rounded">Open Comparison</Link>
            <button onClick={() => setShowCalc(true)} className="px-3 py-2 bg-blue-600 text-white rounded">Rent vs Buy</button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {properties.map((p) => (
            <div key={p.id || p._id} className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={compare.some(c => (c.id || c._id) === (p.id || p._id))}
                  onChange={(e) => {
                    if (e.target.checked) {
                      if (compare.length >= 3) return alert("You can compare up to 3 properties only.");
                      setCompare((prev) => [...prev, p]);
                    } else {
                      setCompare((prev) => prev.filter((x) => (x.id || x._id) !== (p.id || p._id)));
                    }
                  }}
                />
                <span className="text-sm">Compare</span>
              </label>
              <PropertyCard
                property={p}
                onContact={setContactFor}
                isFavorite={favorites.some((x) => (x._id || x.id) === (p._id || p.id))}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          ))}
        </div>
        <Modal isOpen={!!contactFor} onClose={() => setContactFor(null)} title={contactFor ? contactFor.title : "Contact"}>
          {contactFor && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={contactFor.images?.[0]} alt={contactFor.title} className="h-16 w-24 object-cover rounded-lg border border-gray-800" />
                <div>
                  <div className="font-semibold">{contactFor.title}</div>
                  <div className="text-sm text-gray-400">{contactFor.type} • {contactFor.location}</div>
                  <div className="font-bold text-emerald-400">
                    {contactFor.price?.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
              <ContactForm property={contactFor} onDone={() => setContactFor(null)} />
            </div>
          )}
        </Modal>
        <Modal isOpen={showCalc} onClose={() => setShowCalc(false)} title="Rent vs Buy Calculator" size="lg">
          <div className="grid grid-cols-2 gap-3">
            <input value={calc.rent} onChange={(e) => setCalc({ ...calc, rent: e.target.value })} placeholder="Monthly rent (₹)" type="number" className="px-3 py-2 border rounded text-gray-900 bg-white" />
            <input value={calc.price} onChange={(e) => setCalc({ ...calc, price: e.target.value })} placeholder="Property price (₹)" type="number" className="px-3 py-2 border rounded text-gray-900 bg-white" />
            <input value={calc.appreciation} onChange={(e) => setCalc({ ...calc, appreciation: e.target.value })} placeholder="Appreciation % per year" type="number" className="px-3 py-2 border rounded text-gray-900 bg-white" />
            <input value={calc.years} onChange={(e) => setCalc({ ...calc, years: e.target.value })} placeholder="Years" type="number" className="px-3 py-2 border rounded text-gray-900 bg-white" />
          </div>
          <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-700 text-sm">
            {(() => {
              const rent = Number(calc.rent) || 0;
              const price = Number(calc.price) || 0;
              const appr = (Number(calc.appreciation) || 0) / 100;
              const years = Number(calc.years) || 0;
              const totalRent = rent * 12 * years;
              const futureValue = price * Math.pow(1 + appr, years);
              const summary = price ? `Buy: current ₹${price.toLocaleString("en-IN")} → projected ₹${Math.round(futureValue).toLocaleString("en-IN")} in ${years} years` : "Enter price";
              const rentSummary = `Rent: total spend ₹${Math.round(totalRent).toLocaleString("en-IN")} over ${years} years`;
              const suggestion = price && futureValue > price + totalRent ? "Buying may be better long-term." : "Renting may be more economical currently.";
              return (
                <>
                  <div>{summary}</div>
                  <div>{rentSummary}</div>
                  <div className="mt-2 font-semibold text-emerald-400">{suggestion}</div>
                </>
              );
            })()}
          </div>
        </Modal>
      </div>
    </Layout>
  );
}

function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [agent, setAgent] = useState(null);
  const [insights, setInsights] = useState(null);
  const [showAppt, setShowAppt] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showBook, setShowBook] = useState(false);

  useEffect(() => {
    api.get(`/properties/${id}`).then((res) => {
      setProperty(res.data);
      api.get("/agents").then((aRes) => {
        const agents = Array.isArray(aRes.data) ? aRes.data : [];
        const match = agents.find((a) => a.properties?.includes(res.data.id));
        setAgent(match || null);
      }).catch(err => {
        console.error("Failed to load agents:", err);
        setAgent(null);
      });
    }).catch(err => {
      console.error("Failed to load property:", err);
    });
  }, [id]);

  useEffect(() => {
    if (property?.location) {
      api.post("/locality-insights", { location: property.location })
        .then(res => setInsights(res.data.insight))
        .catch(err => console.error("Failed to fetch insights", err));
    }
  }, [property]);

  if (!property) return <Layout><div className="text-center py-10">Loading...</div></Layout>;
  return (
    <Layout>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img src={property.images?.[0]} alt={property.title} className="w-full rounded-lg shadow-lg" />
          <div className="mt-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-primary-gradient">{property.title}</h1>
            <p className="text-gray-400 mt-2 text-lg">{property.type} • {property.location}</p>
            <p className="mt-4 font-bold text-2xl text-emerald-400">
              {property.price.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
            </p>
            <p className="mt-4 text-gray-300 leading-relaxed">{property.description}</p>

            {/* AI Insights Section */}
            <div className="mt-8 p-6 bg-gray-800 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">✨</span> AI Neighborhood Insights
              </h3>
              {insights ? (
                <p className="text-gray-300 leading-relaxed italic border-l-4 border-emerald-500 pl-4">"{insights}"</p>
              ) : (
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {agent && (
            <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl shadow-lg">
              <div className="font-semibold text-lg mb-2 text-white">Agent Information</div>
              <div className="text-xl font-bold text-gray-200">{agent.name}</div>
              <div className="text-sm text-gray-400 mt-1">{agent.email} • {agent.phone}</div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {agent && (
              <button
                onClick={() => setShowAppt(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Schedule Viewing
              </button>
            )}
            <button
              onClick={() => setShowContact(true)}
              className="px-4 py-2 bg-gray-700 text-white rounded"
            >
              Contact Agent
            </button>
            <button
              onClick={() => setShowBook(true)}
              className="px-4 py-2 bg-emerald-600 text-white rounded md:col-span-2"
            >
              Book Property
            </button>
          </div>
          <Modal isOpen={showAppt} onClose={() => setShowAppt(false)} title="Schedule Viewing" size="lg">
            <div className="flex items-center gap-4 mb-4">
              <img src={property.images?.[0]} alt={property.title} className="h-16 w-24 object-cover rounded-lg border border-gray-800" />
              <div>
                <div className="font-semibold">{property.title}</div>
                <div className="text-sm text-gray-400">{property.type} • {property.location}</div>
                <div className="font-bold text-emerald-400">
                  {property.price?.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>
            {agent && <AppointmentForm property={property} agent={agent} onDone={() => setShowAppt(false)} />}
          </Modal>
          <Modal isOpen={showContact} onClose={() => setShowContact(false)} title="Contact Agent" size="lg">
            <div className="flex items-center gap-4 mb-4">
              <img src={property.images?.[0]} alt={property.title} className="h-16 w-24 object-cover rounded-lg border border-gray-800" />
              <div>
                <div className="font-semibold">{property.title}</div>
                <div className="text-sm text-gray-400">{property.type} • {property.location}</div>
                <div className="font-bold text-emerald-400">
                  {property.price?.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>
            <ContactForm property={property} onDone={() => setShowContact(false)} />
          </Modal>
          <Modal isOpen={showBook} onClose={() => setShowBook(false)} title="Book Property" size="lg">
            <div className="flex items-center gap-4 mb-4">
              <img src={property.images?.[0]} alt={property.title} className="h-16 w-24 object-cover rounded-lg border border-gray-800" />
              <div>
                <div className="font-semibold">{property.title}</div>
                <div className="text-sm text-gray-400">{property.type} • {property.location}</div>
                <div className="font-bold text-emerald-400">
                  {property.price?.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>
            <BookProperty property={property} />
          </Modal>
        </div>
      </div>
    </Layout>
  );
}

function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [handled, setHandled] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    api.get("/agents")
      .then((res) => setAgents(Array.isArray(res.data) ? res.data : []))
      .catch(err => {
        console.error(err);
        setAgents([]);
        alert("Failed to load agents: " + (err.response?.data?.message || err.message));
      });
  }, []);
  const openHandled = async (agent) => {
    setSelected(agent);
    setLoading(true);
    setHandled([]);
    try {
      const res = await api.get(`/agents/${agent._id || agent.id}`);
      const list = Array.isArray(res.data.handledProperties) ? res.data.handledProperties : [];
      const imgOk = (p) => Array.isArray(p.images) && p.images.length > 0 && typeof p.images[0] === "string" && p.images[0].trim().length > 0;
      setHandled(list.filter(imgOk));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="grid md:grid-cols-3 gap-6">
        {agents.map((a) => (
          <div key={a.id} className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
            <div className="font-bold text-xl text-white">{a.name}</div>
            <div className="text-sm text-gray-400 mt-1">{a.email} • {a.phone}</div>
            <p className="mt-4 text-sm text-gray-300">{a.bio}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => openHandled(a)} className="px-3 py-2 bg-blue-600 text-white rounded">View Handled</button>
              <a href="/agent" className="px-3 py-2 border border-gray-700 text-gray-300 rounded">Agent Dashboard</a>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={!!selected} onClose={() => { setSelected(null); setHandled([]); }} title={selected ? `Handled by ${selected.name}` : "Handled Properties"} size="lg">
        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : handled.length === 0 ? (
          <div className="text-gray-400">No handled properties found.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {handled.map((p) => (
              <div key={p._id || p.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <img src={p.images?.[0]} alt={p.title} className="h-32 w-full object-cover" />
                <div className="p-3">
                  <div className="font-semibold text-white">{p.title}</div>
                  <div className="text-sm text-gray-400">{p.type} • {p.location}</div>
                  <div className="font-bold text-emerald-400">
                    {p.price?.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <a href={`/property/${p._id || p.id}`} className="px-3 py-1 border border-gray-700 rounded text-gray-300">View</a>
                    <Link to="/compare" state={{ list: [p] }} className="px-3 py-1 bg-gray-800 rounded text-white border border-gray-700">Compare</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </Layout>
  );
}

function CompareWrapper() {
  const { state } = useLocation();
  let list = state?.list || [];
  if (!list.length) {
    try {
      const stored = JSON.parse(localStorage.getItem("compare_list") || "[]");
      if (Array.isArray(stored)) list = stored;
    } catch {}
  }
  const imgOk = (p) => Array.isArray(p.images) && p.images.length > 0 && typeof p.images[0] === "string" && p.images[0].trim().length > 0;
  return <Compare list={list.filter(imgOk)} />;
}

function FavoritesPage() {
  const [list, setList] = useState(() => {
    try { return JSON.parse(localStorage.getItem("favorites") || "[]"); } catch { return []; }
  });
  const remove = (id) => {
    const next = list.filter((p) => (p._id || p.id) !== id);
    setList(next);
    localStorage.setItem("favorites", JSON.stringify(next));
  };
  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Favorites</h1>
        <Link to="/compare" state={{ list }} className="px-3 py-2 bg-gray-100 rounded">Compare Favorites</Link>
      </div>
      {list.length === 0 ? (
        <div className="text-gray-400">No favorites yet. Add some from listings.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {list.map((p) => (
            <div key={p._id || p.id} className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg overflow-hidden">
              <img src={p.images?.[0]} alt={p.title} className="h-40 w-full object-cover" />
              <div className="p-4">
                <div className="font-bold text-white">{p.title}</div>
                <div className="text-sm text-gray-400">{p.type} • {p.location}</div>
                <div className="font-bold text-emerald-400">
                  {p.price?.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
                </div>
                <div className="mt-3 flex gap-2">
                  <a href={`/property/${p._id || p.id}`} className="px-3 py-2 border border-gray-700 rounded text-gray-300">View</a>
                  <button onClick={() => remove(p._id || p.id)} className="px-3 py-2 bg-red-600 text-white rounded">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ListingsPage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
        <Route path="/reset-password/:token" element={<Layout><ResetPassword /></Layout>} />
        <Route path="/agent" element={<Layout><AgentDB /></Layout>} />
        <Route path="/compare" element={<Layout><CompareWrapper /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
      </Routes>
      <Debug />
      <AIChatBubble />
    </>
  );
}
