import axiosClient from "./axiosClient";


export async function markQuestionAsViewed(questionId) {
    const response = await axiosClient.post(
        `/progress/${questionId}/view`
    );

    return response.data;
}

export async function markQuestionAsCompleted(questionId) {
    const response = await axiosClient.post(
        `/progress/${questionId}/complete`
    );

    return response.data;
}

export async function getProgress() {
    const response = await axiosClient.get("/progress");

    return response.data;
}

export async function getProgressSummary() {
    const response = await axiosClient.get("/progress/summary");

    return response.data;
}

export async function getLastPracticedQuestion() {
    const response = await axiosClient.get(
        "/progress/last-practiced"
    );

    if (response.status === 204) {
        return null;
    }

    return response.data;
}

export async function getCategoryProgress() {
    const response = await axiosClient.get(
        "/progress/categories"
    );

    return response.data;
}

export async function getContinueQuestionByCategory(category) {
    const response = await axiosClient.get(
        `/progress/categories/${category}/continue`
    );

    if (response.status === 204) {
        return null;
    }

    return response.data;
}

export async function getQuestionProgressStatus(questionId) {
    const response = await axiosClient.get(
        `/progress/${questionId}/status`
    );

    return response.data;
}
