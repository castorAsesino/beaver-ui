import axios from "../utils/axios";

export const deleteUser = (id) => {
    return axios.delete(`/user/${id}`);
};

export const getUserList = (page, size, orderBy, asc) => {
    return axios.get(`/user`, {params: {page, size, orderBy, asc}})
};

export const getUserById = (userId) => {
    return axios.get(`/user/${userId}`);
};

export const addUser = (user) => {
    return axios.post(`/user`, user)
};

export const updateUser = (user, userId) => {
    return axios.put(`/user/${userId}`, user)
};
