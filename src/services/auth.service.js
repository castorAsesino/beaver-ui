import {authService} from "../utils/axios";

const login = (username, password) => {
    return authService
        .post("/signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken)
                localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    login,
    logout,
    getCurrentUser,
};
