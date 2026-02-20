import axios from "axios";

// Get API base URL from environment or use default
const getApiBase = () => {
  // Check for environment variable
  const envBase = typeof import.meta !== "undefined" ? import.meta.env?.VITE_API_BASE : undefined;
  
  if (envBase && String(envBase).trim()) {
    return String(envBase).trim();
  }
  
  // Check if we're in production (deployed)
  const isProduction = typeof window !== "undefined" && 
    (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1");
  
  if (isProduction) {
    // Default production backend URL
    return "https://real-estate-app-h0om.onrender.com/api";
  }
  
  // Development default
  return "/api";
};

const base = getApiBase();

console.log("API Base URL:", base);

export const api = axios.create({
  baseURL: base
});

export default api;
