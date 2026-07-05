import axiosClient from "./axiosClient";

export async function getQuestions({
    page = 0,
    size = 5,
    keyword = "",
    category = "",
    difficulty = ""
}) {
    const response = await axiosClient.get("/questions/filter", {
        params: {
            page,
            size,
            keyword: keyword || null,
            category: category || null,
            difficulty: difficulty || null
        }
    });

    return response.data;
}

export async function getQuestionById(id) {
    const response = await axiosClient.get(`/questions/${id}`);
    return response.data;
}