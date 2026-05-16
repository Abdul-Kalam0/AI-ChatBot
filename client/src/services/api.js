import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  // baseURL: "https://interviewmock-001-backend.vercel.app/api",
  withCredentials: true,
});

export default API;
