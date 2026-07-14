import api from "./axios";

export const getSchoolSettings = async (schoolId) => {
    const { data } = await api.get(`/settings/${schoolId}/school_details`);
    return data
};