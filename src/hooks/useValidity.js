import {
    useState,
    useEffect,
    useCallback,
} from "react";

import {
    getSchools,
    toggleSchoolStatus,
    resetSchoolAdminPassword,
} from "../api/schools.api";

import {
    getSubscriptionSettings,
    updateSubscriptionSettings,
} from "../api/subscription_plan.api";

export const useSchoolValidity = () => {
    const [school, setSchool] = useState(null);
    const [settings, setSettings] = useState(null);

    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    const loadData = useCallback(async () => {
        setLoading(true);

        try {
            const schools = await getSchools();

            const singleSchool =
                schools?.[0] || null;

            setSchool(singleSchool);

            if (!singleSchool) {
                setSettings(null);
                return;
            }

            const subscription =
                await getSubscriptionSettings();

            setSettings(subscription);

        } catch (error) {
            console.error(
                "Error loading school validity:",
                error
            );
        } finally {
            setLoading(false);
        }

    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const updateValidity = async (payload) => {
        if (!school || !settings)
            return;

        setProcessing(true);

        try {
            const updatedSettings = {
                ...settings,

                validUntil:
                    payload.validUntil,

                validityRemark:
                    payload.validityRemark,
            };

            await updateSubscriptionSettings(
                updatedSettings
            );

            await loadData();

        } finally {
            setProcessing(false);
        }
    };

    const toggleStatus = async () => {
        if (!school)
            return;

        setProcessing(true);

        try {
            const newStatus =
                school.status === "active"
                    ? "suspended"
                    : "active";

            await toggleSchoolStatus(
                school.id,
                newStatus
            );

            await loadData();

        } finally {
            setProcessing(false);
        }
    };

    const resetAdminPassword = async (schoolId) => {
        if (!school)
            return null;

        setProcessing(true);

        try {
            return await resetSchoolAdminPassword();

        } finally {
            setProcessing(false);
        }
    };

    return {
        school,
        settings,

        loading,
        processing,

        refresh: loadData,

        updateValidity,

        toggleStatus,

        resetAdminPassword,
    };
};