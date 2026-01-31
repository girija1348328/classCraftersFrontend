import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getStaffRegistrations = async () => {
    const res = await axios.get(`${API_BASE_URL}/staff-registrations`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
    );
    return res.data;
};

export const getStaffRegistrationById = async (id) => {
    const res = await axios.get(`${API_BASE_URL}/staff-registrations/${id}`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
    );
    return res.data;
};

export const createStaffRegistration = async (data) => {
    const res = await axios.post(`${API_BASE_URL}/staff-registrations`, data,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
    );
    return res.data;
};

export const updateStaffRegistration = async (id, data) => {
    const res = await axios.put(`${API_BASE_URL}/staff-registrations/${id}`, data,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
    );
    return res.data;
};

export const deleteStaffRegistration = async (id) => {
    const res = await axios.delete(`${API_BASE_URL}/staff-registrations/${id}`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
    );
    return res.data;
};
