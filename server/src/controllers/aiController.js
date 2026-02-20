import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getLocalityInsights(req, res) {
  const { location } = req.body;
  
  if (!location) {
    return res.status(400).json({ message: "Location is required" });
  }

  if (process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

      const prompt = `Provide a brief, engaging summary (max 3 sentences) about the lifestyle, connectivity, and vibe of living in ${location} for a potential home buyer.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return res.json({ insight: response.text() });
    } catch (error) {
      console.error("Gemini Locality Error:", error.message);
    }
  } else {
    console.log("GEMINI_API_KEY is missing.");
  }

  // Mock response if API key missing or error
  const mockInsights = {
    "Anna Nagar, Chennai": "[Mock] Anna Nagar is a premium residential locality known for its grid-like roads, lush parks (like Tower Park), and excellent social infrastructure including top schools and hospitals. It offers a perfect blend of peaceful living with modern urban conveniences.",
    "Sholinganallur, Chennai": "Sholinganallur is a key IT hub on the OMR corridor, making it ideal for tech professionals. It boasts excellent connectivity to ECR and the city center, with numerous gated communities and proximity to the beach.",
    "Thoraipakkam, Chennai": "Thoraipakkam is a rapidly developing residential area on OMR, favored for its affordability and closeness to major IT parks. It offers good connectivity and a growing number of retail and dining options.",
    "Adyar, Chennai": "Adyar is one of Chennai's most affluent and greenest neighborhoods, blending old-world charm with modern luxury. Home to the Theosophical Society and Elliot's Beach, it offers a serene, culturally rich living experience.",
    "ECR, Chennai": "East Coast Road (ECR) offers a scenic, resort-like lifestyle along the coast, perfect for those seeking luxury villas and weekend getaways. It is less congested but well-connected to the city via the scenic highway."
  };

  res.json({
    insight: mockInsights[location] || `${location} is a well-connected area with good residential amenities and easy access to local markets and transport hubs, making it a convenient choice for families.`
  });
}

export async function chat(req, res) {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  // Get properties for context
  const Property = (await import("../models/Property.js")).default;
  const properties = await Property.find().limit(20);
  
  const propertyContext = properties.map(p =>
    `${p.title} (${p.type}) in ${p.location} for ₹${p.price.toLocaleString("en-IN")}. ${p.rooms}BHK.`
  ).join("\n");

  if (process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

      const prompt = `You are a helpful real estate assistant. Here is the list of available properties:\n${propertyContext}\n\nUser Question: ${message}\n\nAnswer based on the property list provided. If asked about something not on the list, politely say you don't have that information. Keep answers concise.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return res.json({ reply: response.text() });
    } catch (error) {
      console.error("Gemini Chat Error:", error.message);
    }
  } else {
    console.log("GEMINI_API_KEY is missing for chat.");
  }

  // Basic mock response logic (keyword matching)
  let reply = "I can help you find properties. Try asking about 'villas', 'apartments', or specific locations like 'Anna Nagar'.";
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("villa")) {
    const villas = properties.filter(p => p.type === "House");
    reply = `We have ${villas.length} villas available. For example: ${villas.map(v => v.title).join(", ")}.`;
  } else if (lowerMsg.includes("apartment") || lowerMsg.includes("flat")) {
    const apts = properties.filter(p => p.type === "Apartment");
    reply = `We have ${apts.length} apartments available. Check out: ${apts.map(a => a.title).join(", ")}.`;
  } else if (lowerMsg.includes("anna nagar")) {
    const an = properties.filter(p => p.location.includes("Anna Nagar"));
    reply = `In Anna Nagar, we have: ${an.map(p => p.title).join(", ")}.`;
  } else if (lowerMsg.includes("price") || lowerMsg.includes("cost")) {
    reply = "Our properties range from ₹80 Lakhs to ₹6.5 Crores. What's your budget?";
  }

  res.json({ reply });
}

