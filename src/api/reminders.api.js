import api from "./axios";

export const createReminder = async (
    payload
) => {
    const { data } = await api.post(
        "/reminders",
        payload
    );

    return data;
};