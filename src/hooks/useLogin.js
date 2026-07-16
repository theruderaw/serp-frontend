import { useEffect, useState } from "react";
import { getSchools } from "../api/schools.api";
import { getSchoolSettings } from "../api/settings.api";
import { login as loginApi } from "../api/auth.api";

export default function useLogin() {
    const [loading, setLoading] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [error, setError] = useState("");

    const [school, setSchool] = useState(null);
    const [schoolSettings, setSchoolSettings] = useState(null);

    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
        rememberMe: false,
    });

    useEffect(() => {
        loadSchool();
    }, []);

    const loadSchool = async () => {
        try {
            setInitializing(true);

            const schools = await getSchools();

            if (!schools?.length) {
                setError("No school found.");
                return;
            }

            const currentSchool = schools[0];
            setSchool(currentSchool);

            const settings = await getSchoolSettings();
            setSchoolSettings(settings);
        } catch {
            setError("Connection failed.");
        } finally {
            setInitializing(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleLogin = async () => {
        setLoading(true);
        setError("");

        try {
            const identifier = formData.identifier.trim();

            const payload = {
                password: formData.password,
                ...(identifier.includes("@")
                    ? { email: identifier }
                    : { name: identifier }),
            };

            const data = await loginApi(payload);

            return data;
        } catch (err) {
            setError(err?.response?.data?.message || "Login failed.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        initializing,
        error,

        school,
        schoolSettings,

        formData,
        setFormData,

        handleChange,
        handleLogin,
    };
}