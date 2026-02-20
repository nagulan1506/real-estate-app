// Mock data for when database is not connected
export const mockProperties = [
  {
    _id: "p1",
    title: "Grand Villa in Anna Nagar",
    type: "House",
    location: "Anna Nagar, Chennai",
    price: 65000000,
    size: 4200,
    rooms: 5,
    lat: 13.0850,
    lng: 80.2100,
    images: [
      "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-2251330d666e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Ultra-luxury independent villa with premium finishes and private amenities in the heart of Anna Nagar."
  },
  {
    _id: "p2",
    title: "Spacious Villa in Sholinganallur",
    type: "House",
    location: "Sholinganallur, Chennai",
    price: 12000000,
    size: 2200,
    rooms: 3,
    lat: 12.8996,
    lng: 80.2209,
    images: [
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=1200",
      "https://images.unsplash.com/photo-1600596542815-2251330d666e?q=80&w=1200",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200"
    ],
    description: "Modern villa located near the IT corridor with excellent connectivity."
  },
  {
    _id: "p3",
    title: "Modern 2BHK Flat near OMR",
    type: "Apartment",
    location: "Thoraipakkam, Chennai",
    price: 8000000,
    size: 1100,
    rooms: 2,
    lat: 12.9400,
    lng: 80.2300,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Perfect for IT professionals, close to major tech parks."
  },
  {
    _id: "p4",
    title: "Independent House in Adyar",
    type: "House",
    location: "Adyar, Chennai",
    price: 30000000,
    size: 2400,
    rooms: 3,
    lat: 13.0012,
    lng: 80.2565,
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Traditional style independent house in a quiet, leafy neighborhood."
  },
  {
    _id: "p5",
    title: "Seaside Villa in ECR",
    type: "House",
    location: "ECR, Chennai",
    price: 45000000,
    size: 3500,
    rooms: 4,
    lat: 12.8500,
    lng: 80.2400,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200"
    ],
    description: "Stunning beach house with direct sea access and private pool."
  },
  {
    _id: "p6",
    title: "Luxury Apartment in T. Nagar",
    type: "Apartment",
    location: "T. Nagar, Chennai",
    price: 22000000,
    size: 1800,
    rooms: 3,
    lat: 13.0418,
    lng: 80.2341,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200"
    ],
    description: "Premium apartment in the shopping district, close to Panagal Park."
  },
  {
    _id: "p7",
    title: "Gated Community in Porur",
    type: "Apartment",
    location: "Porur, Chennai",
    price: 7500000,
    size: 1050,
    rooms: 2,
    lat: 13.0382,
    lng: 80.1565,
    images: [
      "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200"
    ],
    description: "Affordable luxury in a secure gated community near DLF IT Park."
  },
  {
    _id: "p8",
    title: "Penthouse in Nungambakkam",
    type: "Apartment",
    location: "Nungambakkam, Chennai",
    price: 55000000,
    size: 3000,
    rooms: 4,
    lat: 13.0604,
    lng: 80.2496,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200"
    ],
    description: "Exclusive penthouse with panoramic city views and private terrace."
  }
];

export const mockAgents = [
  {
    _id: "a1",
    name: "Suresh Kumar",
    email: "suresh@example.com",
    phone: "+91-98765-43210",
    bio: "Expert in residential properties across Anna Nagar and T. Nagar.",
    properties: ["p1", "p4", "p6"]
  },
  {
    _id: "a2",
    name: "Priya Rajan",
    email: "priya@example.com",
    phone: "+91-98989-89898",
    bio: "Specializing in luxury villas and OMR IT corridor apartments.",
    properties: ["p2", "p3", "p8"]
  },
  {
    _id: "a3",
    name: "Ravi Shankar",
    email: "ravi@example.com",
    phone: "+91-90000-11111",
    bio: "Focuses on emerging IT hubs like Porur and Vadapalani.",
    properties: ["p7"]
  },
  {
    _id: "a4",
    name: "Meera Nair",
    email: "meera@example.com",
    phone: "+91-99887-77665",
    bio: "Expert in ECR beach houses and premium South Chennai localities.",
    properties: ["p5"]
  }
];


