import api from "./axios";

export const getSchools = async () => {
    const { data } = await api.get("/schools");
    return data;
};