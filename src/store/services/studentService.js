import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // adjust if your backend URL differs

// Fetch all students
export const getStudents = async () => {
  const res = await axios.get(`${API_BASE_URL}/student-registrations`);
  return res.data;
};

// Add new student
export const createStudent = async (student) => {
  const res = await axios.post(`${API_BASE_URL}/student-registrations`, student);
  return res.data;
};

// Update student
export const updateStudent = async (id, data) => {
  const res = await axios.put(`${API_BASE_URL}/student-registrations/${id}`, data);
  return res.data;
};

// Delete student
export const deleteStudent = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/student-registrations/${id}`);
  return res.data;
};
