import axiosClient from "./axiosClient";

export async function getFavorites() {
    const response = await axiosClient.get("/favorites");
    return response.data;
}

export async function addFavorite(questionId) {
    const response = await axiosClient.post(
        `/favorites/${questionId}`
    );

    return response.data;
}

export async function removeFavorite(questionId) {
    await axiosClient.delete(
        `/favorites/${questionId}`
    );
}

export async function getFavoriteStatus(questionId) {
    const response = await axiosClient.get(
        `/favorites/${questionId}/status`
    );

    return response.data.favorite;
}