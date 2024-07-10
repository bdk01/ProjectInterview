import axios from "axios";
const BASE_URL = import.meta.env.VITE_URI_SERVER
console.log(BASE_URL)
/* const BASE_URL = "http://localhost:8000"; */
const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  },
});

export default instance;
