import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createTimetable = async (data) => {
    const res = await axios.post(`${API_BASE_URL}/timetable`, data,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
    );
    return res.data;
};

export const getTimetableByClass = async (classId) => {
    const res = await axios.get(`${API_BASE_URL}/timetable/timetable/class/${classId}`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
    );
    return res.data;
};

export const getTimetableByTeacher = async (teacherId) => {
    const res = await axios.get(`${API_BASE_URL}/timetable/timetable/teacher/${teacherId}`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
    );
    return res.data;
};

export const updateTimetable = async (id, data) => {
    const res = await axios.put(`${API_BASE_URL}/timetable/${id}`, data,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
    );
    return res.data;
};

export const deleteTimetable = async (id) => {
    const res = await axios.delete(`${API_BASE_URL}/timetable/${id}`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
    );
    return res.data;
};  


