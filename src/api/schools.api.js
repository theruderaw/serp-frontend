import api from "./axios";

export const getSchools = async () => {
    const { data } = await api.get("/schools");
    return data;
};

export const toggleSchoolStatus = async (schoolId, status) => {
    const { data } = await api.patch(
        `/schools/${schoolId}/status`,
        { status }
    );

    return data;
};

export const resetSchoolAdminPassword = async (schoolId) => {
    const { data } = await api.post(
        `/schools/${schoolId}/reset-admin-password`
    );

    return data;
};