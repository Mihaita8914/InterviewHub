import axiosClient from "./axiosClient";

export async function login(credentials) {
    const response = await axiosClient.post("/auth/login", credentials);
    return response.data;
}

export async function register(user) {
    const response = await axiosClient.post("/auth/register", user);
    return response.data;
}

export async function getCurrentUser() {
    const response = await axiosClient.get("/auth/me");
    return response.data;
}