// src/hooks/useSettings.js

import {
    useState,
    useEffect,
    useCallback,
} from "react";

import {
    getSchool,
    updatePlan as updatePlanApi,
    resetSchoolAdminPassword,
} from "../api/schools.api";

const useSettings = (schoolId) => {
    const [settings, setSettings] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [processing, setProcessing] =
        useState(false);

    const [error, setError] =
        useState(null);

    const fetchSettings =
        useCallback(async () => {
            if (!schoolId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const data =
                    await getSchool(
                        schoolId
                    );

                setSettings(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }, [schoolId]);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const updatePlan = async (
        plan
    ) => {
        try {
            setProcessing(true);
            setError(null);

            const updated =
                await updatePlanApi(
                    schoolId,
                    plan
                );

            setSettings(updated);

            return updated;
        } catch (err) {
            console.error(err);
            setError(err);
            throw err;
        } finally {
            setProcessing(false);
        }
    };

    const resetAdminPassword =
        async (newPassword) => {
            try {
                setProcessing(true);
                setError(null);

                return await resetSchoolAdminPassword(
                    schoolId,
                    newPassword
                );
            } catch (err) {
                console.error(err);
                setError(err);
                throw err;
            } finally {
                setProcessing(false);
            }
        };

    return {
        settings,

        loading,
        processing,
        error,

        refresh: fetchSettings,
        updatePlan,
        resetAdminPassword,
    };
};

export default useSettings;