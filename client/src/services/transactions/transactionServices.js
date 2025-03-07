import axios from 'axios';
import { BASE_URL } from '../../utils/url';
import { getUserFromStorage } from '../../utils/getUserFromStorage';

// Get the token of the user logged in
const token = getUserFromStorage()?.token;

//! Add Transaction
export const addTransactionAPI = async({ type, category, amount, date, description }) => {
    const response = await axios.post(`${BASE_URL}/transaction/add`, {
        categorytype: type,
        categoryname: category,
        amount: amount,
        date: date || null,
        description: description,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

//! Get category list
export const listTransactionsAPI = async({ category, startDate, endDate, type}) => {
    const response = await axios.get(`${BASE_URL}/transaction/filter-list`, {
        params: {
            startDate, endDate, categorytype: type, categoryname: category,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

//! Update category
export const updateTransactionAPI = async({ category, amount, date, description, id }) => {
    const response = await axios.put(`${BASE_URL}/transaction/update/${id}`, {
        categoryname: category,
        amount,
        date,
        description,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

//! Delete category
export const deleteTransactionAPI = async(id) => {
    const response = await axios.delete(`${BASE_URL}/transaction/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
