
import api from "./axios";

export const getGlobalStats = async () => {
    const { data } = await api.get(`/system/stats/global`);
    return data
};