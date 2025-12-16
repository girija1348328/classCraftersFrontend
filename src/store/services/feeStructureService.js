import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const createFeeStructure = async (feeData) => {
    const response = await axios.post(`${API_URL}/fee-structures`, feeData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
}

export const createFeeHead = async (structureId, headData) => {
    const response = await axios.post(`${API_URL}/fee-structures/2/heads`, headData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
}

export const createFeeInstallment = async (structureId, installmentData) => {
    const response = await axios.post(`${API_URL}/fee-structures/${structureId}/installments`, installmentData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
}

export const createFeeDiscount = async (structureId, discountData) => {
    const response = await axios.post(`${API_URL}/fee-structures/${structureId}/discounts`, discountData,

        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
}

export const createFineRule = async (structureId, fineData) => {
    const response = await axios.post(`${API_URL}/fee-structures/${structureId}/fine-rules`, fineData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
}

