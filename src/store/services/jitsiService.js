import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL ;

export const getJitsiToken = async (roomName) => {
  const response = await axios.get(`${API_URL}/classrooms/jitsi/${roomName}`);
  return response.data;
};
