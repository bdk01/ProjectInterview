import axios from "axios";
const BASE_URL = import.meta.env.VITE_URI_SERVER
console.log(BASE_URL)
/* const BASE_URL = "http://localhost:8000"; */
const instance = axios.create({
  baseURL: BASE_URL
});

export default instance;
