import axios from "axios";
export const API = import.meta.env.VITE_API || "http://localhost:4000";
export function authHeader(token) { return { Authorization: `Bearer ${token}` }; }
export const client = axios.create({ baseURL: API });
