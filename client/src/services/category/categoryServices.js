import axios from 'axios';
import { BASE_URL } from '../../utils/url';
import { getUserFromStorage } from '../../utils/getUserFromStorage';

// Get the token of the user logged in
const token = getUserFromStorage()?.token;

//! Add Category
export const addCategoryAPI = async({ type, name }) => {
    const response = await axios.post(`${BASE_URL}/category/add`, {
        name,
        type,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

//! Get category list
export const listCategoryAPI = async() => {
    const response = await axios.get(`${BASE_URL}/category/list`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

//! Update category
export const updateCategoryAPI = async({ name, type, id }) => {
    const response = await axios.put(`${BASE_URL}/category/update/${id}`, {
        name,
        type,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

//! Delete category
export const deleteCategoryAPI = async(id) => {
    const response = await axios.delete(`${BASE_URL}/category/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
