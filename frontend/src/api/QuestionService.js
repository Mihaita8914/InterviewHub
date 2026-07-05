import axiosClient from "./axiosClient";

export async function getQuestions() {
    const response = await axiosClient.get("/questions");
    return response.data;
}