import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getSubgroups = async () => {
    const res = await axios.get(`${API_BASE_URL}/sub-groups`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
    );
    return res.data;
};
