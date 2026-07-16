import { SCHOOL_ID } from "../config/school";
import api from "./axios";

export const getSchoolSettings = async () => {
    const { data } = await api.get(`/settings/${SCHOOL_ID}/school_details`);
    return data
};