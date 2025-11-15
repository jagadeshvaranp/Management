import axios from "axios";

const API = axios.create({
  baseURL: "/api/products", // Relative path - will be proxied by IIS
});

export default API;
