import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signup = async (userData) => {
  const res = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
  return res.data;
};
export const login = async (credentials) => {
  const res = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return res.data;
}