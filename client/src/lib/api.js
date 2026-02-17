import axios from "axios";

const base = "https://real-estate-app-h0om.onrender.com/api";

export const api = axios.create({
  baseURL: base
});

export default api;
