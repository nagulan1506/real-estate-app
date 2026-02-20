import { Link } from "react-router-dom";

const stats = [
  { label: "Properties Listed", value: "500+" },
  { label: "Verified Agents", value: "50+" },
  { label: "Happy Clients", value: "1200+" },
  { label: "Cities Covered", value: "10+" },
];

const features = [
  { icon: "🏠", title: "Full-Featured Listings", desc: "Detailed property listings with photos, pricing, and specs across Chennai." },
  { icon: "✨", title: "AI Neighborhood Insights", desc: "Gemini AI-powered insights for each locality to help you decide smarter." },
  { icon: "🗺️", title: "Interactive Map View", desc: "Browse properties visually on an interactive Leaflet map." },
  { icon: "⚖️", title: "Property Comparison", desc: "Compare up to 3 properties side-by-side to find your best match." },
  { icon: "💳", title: "Secure Payments", desc: "Razorpay-powered secure booking token payments with instant verification." },
  { icon: "📅", title: "Schedule Viewings", desc: "Book appointments directly with verified agents in a few clicks." },
];

const techStack = [
  { name: "React 18", color: "text-sky-400", bg: "bg-sky-500/10", icon: "⚛️" },
  { name: "Node.js & Express", color: "text-green-400", bg: "bg-green-500/10", icon: "🟢" },
  { name: "MongoDB & Mongoose", color: "text-emerald-400", bg: "bg-emerald-500/10", icon: "🍃" },
  { name: "TailwindCSS", color: "text-cyan-400", bg: "bg-cyan-500/10", icon: "💨" },
  { name: "Razorpay", color: "text-blue-400", bg: "bg-blue-500/10", icon: "💳" },
  { name: "Gemini AI", color: "text-purple-400", bg: "bg-purple-500/10", icon: "✨" },
  { name: "Leaflet Maps", color: "text-lime-400", bg: "bg-lime-500/10", icon: "🗺️" },
  { name: "JWT Auth", color: "text-yellow-400", bg: "bg-yellow-500/10", icon: "🔐" },
];

const locations = {
  "Premium Zones": ["Anna Nagar", "T. Nagar", "Adyar", "Nungambakkam"],
  "IT Corridor": ["OMR", "Sholinganallur", "Thoraipakkam", "Porur"],
  "Coastal Areas": ["ECR", "Beachfront", "Neelankarai"],
  "Emerging Areas": ["Vadapalani", "Velachery", "Mylapore"],
};

export default function About() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 border border-gray-800 p-10 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-sky-500/5 pointer-events-none" />
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400 mb-4">
          NoBrokerNoCry
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Chennai's modern real estate platform — connecting buyers, renters, and verified agents with AI-powered insights and zero broker hassle.
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <Link to="/" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition shadow-lg">
            Browse Properties
          </Link>
          <Link to="/agents" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/20 transition">
            Meet the Agents
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center hover:border-emerald-800 transition">
            <div className="text-3xl font-extrabold text-emerald-400">{s.value}</div>
            <div className="text-sm text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-7">
          <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            At NoBrokerNoCry, we believe finding your perfect home should be seamless and stress-free. We cut out the middlemen and connect you directly with verified agents, backed by AI insights and a modern search experience.
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-7">
          <h2 className="text-2xl font-bold text-white mb-3">Why It's Different</h2>
          <ul className="text-gray-300 space-y-2 text-sm">
            {["No hidden broker fees", "AI-generated locality insights", "Real-time appointment booking", "Secure Razorpay payment gateway", "Side-by-side property comparison"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-emerald-400 text-base">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Features */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-5">Features</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-white font-semibold mb-1">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-7">
        <h2 className="text-2xl font-bold text-white mb-5">Built With</h2>
        <div className="flex flex-wrap gap-3">
          {techStack.map((t) => (
            <span key={t.name} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${t.bg} ${t.color} border border-current/20`}>
              <span>{t.icon}</span> {t.name}
            </span>
          ))}
        </div>
      </div>

      {/* Coverage */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-7">
        <h2 className="text-2xl font-bold text-white mb-5">Our Coverage — Chennai</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {Object.entries(locations).map(([zone, areas]) => (
            <div key={zone}>
              <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2">{zone}</h3>
              <ul className="space-y-1">
                {areas.map((a) => (
                  <li key={a} className="text-gray-400 text-sm flex items-center gap-1">
                    <span className="text-gray-600">›</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Developer / Contact */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-7">
        <h2 className="text-2xl font-bold text-white mb-5">Developer</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
            N
          </div>
          <div>
            <div className="text-white font-bold text-lg">Nagulan</div>
            <div className="text-gray-400 text-sm mt-1">Full-Stack Developer · MERN Stack · Chennai, India</div>
            <div className="flex gap-4 mt-3">
              <a
                href="https://github.com/Nagulan1506"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-sky-400 hover:text-sky-300 transition flex items-center gap-1"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/nagulan-s"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center text-gray-500 text-sm pb-4">
        <p>© {new Date().getFullYear()} NoBrokerNoCry · Crafted with ❤️ in Chennai, India</p>
      </div>
    </div>
  );
}
