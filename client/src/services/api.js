import axios from "axios";

const API = axios.create({
  baseURL: "https://interviewmock-001-backend.vercel.app/api",
  withCredentials: true,
});

export default API;
