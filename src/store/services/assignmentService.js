import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const createAssignment = async (assignmentData) => {
  const response = await axios.post(`${API_URL}/assignments/assignments`, assignmentData);
  return response.data;
};

export const getAssignmentsByClassroomId = async (classroomId) => {
  const response = await axios.get(`${API_URL}/assignments/classrooms/${classroomId}/assignments`);
  return response.data;
};
