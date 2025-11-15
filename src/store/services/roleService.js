import axios from "axios";

// ✅ For Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllRole = async () => {
  const res = await axios.get(`${API_BASE_URL}/roles`);
  return res.data;
};
export const getRole = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/roles/${id}`);
  return res.data;
};

export const createRole = async (roleData) => {
  const res = await axios.post(`${API_BASE_URL}/roles`, roleData);
  return res.data;
};                
export const updateRole = async (id, updates) => {
  const res = await axios.put(`${API_BASE_URL}/roles/${id}`, updates);
  return res.data;
}   
export const deleteRole = async (id) => {
  await axios.delete(`${API_BASE_URL}/roles/${id}`);
};  
