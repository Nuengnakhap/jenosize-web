import axios from "axios";

export const BASE_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3011"
    : "https://jenosize-service.up.railway.app";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;
