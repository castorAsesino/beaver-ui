import axios from "axios";
import authHeader from "./auth-header";

export const deleteUser = (id) => {
    return axios.delete(`http://localhost:8080/api/v1/user/${id}`, {headers: authHeader()});
};

export const getUserList = (page, size, orderBy, asc) => {
    return axios.get(`http://localhost:8080/api/v1/user`, {params: {page, size, orderBy, asc}, headers: authHeader()})
};

export const getUserById = (userId) => {
    return axios.get(`http://localhost:8080/api/v1/user/${userId}`, {headers: authHeader()});
};

export const addUser = (user) => {
    return axios.post(`http://localhost:8080/api/v1/user`, user, {headers: authHeader()})
};

export const updateUser = (user, userId) => {
    return axios.post(`http://localhost:8080/api/v1/user/${userId}`, user, {headers: authHeader()})
};
