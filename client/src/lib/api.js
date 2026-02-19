import axios from "axios";

const envBase = typeof import.meta !== "undefined" ? import.meta.env?.VITE_API_BASE : undefined;
const base = (envBase && String(envBase).trim()) || "https://real-estate-app-h0om.onrender.com/api";

export const api = axios.create({
  baseURL: base
});

export default api;
