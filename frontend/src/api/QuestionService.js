import axiosClient from "./axiosClient";

export async function getQuestions({
    page = 0,
    size = 5,
    keyword = "",
    category = "",
    topic = "",
    difficulty = ""
}) {
    const response = await axiosClient.get("/questions/filter", {
        params: {
            page,
            size,
            keyword: keyword || null,
            category: category || null,
            topic: topic || null,
            difficulty: difficulty || null
        }
    });

    return response.data;
}

export async function getQuestionById(id) {
    const response = await axiosClient.get(`/questions/${id}`);
    return response.data;
}

export async function getAdminQuestionById(id) {
    const response = await axiosClient.get(
        `/questions/admin/${id}`
    );

    return response.data;
}

export async function getAdminQuestions({
    page = 0,
    size = 10
}) {
    const response = await axiosClient.get("/questions", {
        params: {
            page,
            size,
            sort: "id,desc"
        }
    });

    return response.data;
}


export async function deleteQuestion(id) {
    await axiosClient.delete(`/questions/${id}`);
}

export async function createQuestion(question) {
    const response = await axiosClient.post("/questions", question);
    return response.data;
}

export async function updateQuestion(id, question) {
    const response = await axiosClient.put(`/questions/${id}`, question);
    return response.data;
}

export async function getRandomQuestion() {
    const response = await axiosClient.get(
        "/questions/random"
    );

    return response.data;
}