// For fetching data from the backend
import axios from 'axios';
import { BASE_URL } from '../../utils/url';
import { getUserFromStorage } from '../../utils/getUserFromStorage';
const token = getUserFromStorage()?.token;
//! Login
export const loginAPI = async({ user, password }) => {
    const response = await axios.post(`${BASE_URL}/user/login`, {
        user,
        password,
    });
    //! Return the promise
    return response.data;
    // React Query will take care of the errors
}

//! Register
export const registerAPI = async({ username, email, password}) => {
    const response = await axios.post(`${BASE_URL}/user/register`, {
        username,
        email,
        password,
    })
    return response.data;
}

//! Update User
export const updateUserAPI = async({ email, username, password }) => {
    console.log(email);
    console.log(username);
    console.log(password);
    const response = await axios.put(`${BASE_URL}/user/update-profile`, {
        email,
        username,
        password,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

//! Change Password 
export const changePasswordAPI = async({ oldPassword, password }) => {
    console.log(oldPassword);
    console.log(password);
    const response = await axios.put(`${BASE_URL}/user/change-password`, {
        oldPassword: oldPassword,
        newPassword: password,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}