import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL ;

export const getInstitutions = async () => {
  const response = await axios.get(`${API_URL}/institutions`,{
     headers: { "Cache-Control": "no-cache" },
  });
  return response.data;
}