import axios from "axios";

const base = import.meta.env?.VITE_API_BASE ||
  (import.meta.env.DEV ? "/api" : "https://real-estate-app-h0om.onrender.com/api");

export const api = axios.create({
  baseURL: base
});

export default api;
