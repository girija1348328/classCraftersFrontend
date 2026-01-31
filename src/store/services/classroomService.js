import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL ;


export const createClassroom = async (classData) => {
  const response = await axios.post(`${API_URL}/classrooms`, classData);
  return response.data;
}

export const getClassrooms = async () => {
  const response = await axios.get(`${API_URL}/classrooms`,{
     headers: { "Cache-Control": "no-cache" },
  });
//   console.log("Classroom Service Response:", response);
  return response.data;
}  

export const getClassroomById = async (id) => {
  // console.log("Fetching classroom with ID:", id);
  const response = await axios.get(`${API_URL}/classrooms/${id}`);
  // console.log("Classroom Service getById Response:", response);
  return response.data;
}


export const updateClassroom = async (id, updates) => {
  const response = await axios.put(`${API_URL}/classrooms/${id}`, updates);
  return response.data;
}
export const deleteClassroom = async (id) => {
  const response = await axios.delete(`${API_URL}/classrooms/${id}`);
  return response.data;
}

export const createSubject = async (subjectData,id) => {
  const response = await axios.post(`${API_URL}/classrooms/subject/${id}`, subjectData);
  return response.data;
}

export const getAllSubjects = async () => {
  const response = await axios.get(`${API_URL}/classrooms/allSubjects`);
  return response.data;
}

export const getSubjectById = async (id) => {
  const response = await axios.get(`${API_URL}/subjects/${id}`);
  return response.data;
}

export const updateSubject = async (id, updates) => {
  const response = await axios.put(`${API_URL}/subjects/${id}`, updates);
  return response.data;
}

export const deleteSubject = async (id) => {
  const response = await axios.delete(`${API_URL}/subjects/${id}`);
  return response.data; 

    
}