import api from "./axios";

/* -------------------------------------------------------------------------- */
/*                                   Schools                                  */
/* -------------------------------------------------------------------------- */

export const getSchools = async (params = {}) => {
    const { data } = await api.get("/schools", { params });
    return data;
};

export const getSchool = async (id) => {
    const { data } = await api.get(`/schools/${id}`);
    return data;
};

export const getSchoolBySlug = async (slug) => {
    const { data } = await api.get(`/schools/slug/${slug}`);
    return data;
};

export const createSchool = async (payload) => {
    const { data } = await api.post("/schools", payload);
    return data;
};

export const updateSchool = async (id, payload) => {
    const { data } = await api.put(`/schools/${id}`, payload);
    return data;
};

export const updateCompany = async (id, payload) => {
    const { data } = await api.put(
        `/schools/${id}/company`,
        payload
    );
    return data;
};

export const updatePlan = async (
    id,
    plan
) => {
    const { data } = await api.put(
        `/schools/${id}/plan`,
        { plan }
    );

    return data;
};

export const toggleSchoolStatus = async (id, status) => {
    const { data } = await api.patch(
        `/schools/${id}/status`,
        status
    );
    return data;
};

/* -------------------------------------------------------------------------- */
/*                                    Users                                   */
/* -------------------------------------------------------------------------- */

export const getSchoolUsers = async (schoolId) => {
    const { data } = await api.get(
        `/schools/${schoolId}/users`
    );
    return data;
};

export const resetSchoolAdminPassword = async (
    id,
    newPassword
) => {
    const { data } = await api.post(
        `/schools/${id}/reset-admin-password`,
        { newPassword }
    );

    return data;
};

/* -------------------------------------------------------------------------- */
/*                                   Modules                                  */
/* -------------------------------------------------------------------------- */

export const getSchoolModules = async (schoolId) => {
    const { data } = await api.get(
        `/schools/${schoolId}/modules`
    );
    return data;
};

export const toggleSchoolModule = async (
    schoolId,
    payload
) => {
    const { data } = await api.post(
        `/schools/${schoolId}/modules/toggle`,
        payload
    );
    return data;
};