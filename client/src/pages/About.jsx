export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-primary-gradient mb-4">
          About NoBrokerNoCry
        </h1>
        <p className="text-xl text-gray-300">
          Your trusted partner in finding your dream home in Chennai
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            At NoBrokerNoCry, we believe that finding your perfect home should be a seamless and enjoyable experience. 
            We connect homebuyers with trusted real estate agents and provide comprehensive property listings across Chennai, 
            making the journey to homeownership smooth and stress-free.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">What We Offer</h2>
          <ul className="text-gray-300 space-y-2">
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">✓</span>
              <span>Comprehensive property listings with detailed information</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">✓</span>
              <span>AI-powered neighborhood insights</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">✓</span>
              <span>Property comparison tools</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">✓</span>
              <span>Direct connection with verified agents</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">✓</span>
              <span>Interactive map view of properties</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">✓</span>
              <span>Secure booking and payment options</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-2">Transparency</h3>
            <p className="text-gray-300 text-sm">
              We provide clear, detailed information about every property, ensuring you make informed decisions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-2">Expert Agents</h3>
            <p className="text-gray-300 text-sm">
              Our network of verified real estate agents specializes in different areas of Chennai, 
              bringing local expertise to your search.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-2">Technology-Driven</h3>
            <p className="text-gray-300 text-sm">
              Leveraging AI and modern technology to provide insights and streamline your property search experience.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Our Coverage</h2>
        <p className="text-gray-300 mb-4">
          We specialize in properties across Chennai, with a focus on:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Premium Locations</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Anna Nagar</li>
              <li>• T. Nagar</li>
              <li>• Adyar</li>
              <li>• Nungambakkam</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">IT Corridor</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• OMR (Old Mahabalipuram Road)</li>
              <li>• Sholinganallur</li>
              <li>• Thoraipakkam</li>
              <li>• Porur</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Coastal Areas</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• ECR (East Coast Road)</li>
              <li>• Beachfront properties</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Emerging Areas</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Vadapalani</li>
              <li>• Velachery</li>
              <li>• Mylapore</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-8 text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">Get Started Today</h2>
        <p className="text-gray-300 mb-6">
          Ready to find your dream home? Browse our listings, connect with agents, or use our AI assistant 
          to get personalized recommendations.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-[#87CEEB] text-gray-900 font-bold rounded-full hover:bg-[#76c2e3] transition"
          >
            Browse Properties
          </a>
          <a
            href="/agents"
            className="px-6 py-3 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 transition"
          >
            View Agents
          </a>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm mt-8 pb-8">
        <p>© {new Date().getFullYear()} NoBrokerNoCry. All rights reserved.</p>
        <p className="mt-2">Crafted with love in Chennai, India</p>
      </div>
    </div>
  );
}

