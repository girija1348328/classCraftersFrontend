import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getPhases = async () => {
  const res = await axios.get(
    `${API_BASE_URL}/phases`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
  );
  return res.data;
}
