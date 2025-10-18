import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/products", // Your backend URL
});

export default API;
