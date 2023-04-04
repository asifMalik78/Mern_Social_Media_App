import axios from "axios";


const baseURL = "http://localhost:5000/api";

const publicRequest = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

const userRequest = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export { publicRequest, userRequest };
