import axiosClient from "../api/axiosClient";

const getQuestions = () => {
    return axiosClient.get("/questions");
};

export default {
    getQuestions,
};