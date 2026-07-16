import React, { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import BrandingPanel from "../components/Settings/BrandingPanel";
import SecurityPanel from "../components/Settings/SecurityPanel";
import DefaultPlanPanel from "../components/Settings/DefaultPlanPanel";

/**
 * SuperAdminSettings
 *
 * Pure frontend for now — all state is local. Swap the three useState blocks
 * below for a single hook once the backend exists, e.g.:
 *
 *   const {
 *     branding, saveBranding, savingBranding,
 *     securityForm, updatePassword, updatingPassword,
 *     defaultPlan, plans, saveDefaultPlan, savingDefaultPlan,
 *   } = useSystemSettings();
 *
 * Each panel already takes (form, onChange, onSave, saving) as props, so
 * wiring up the hook should just mean replacing the local state + handlers
 * below without touching the panel components themselves.
 */
const SuperAdminSettings = () => {
    // --- Branding ---------------------------------------------------------
    const [brandingForm, setBrandingForm] = useState({
        companyName: "",
        logoUrl: "",
    });
    const [savingBranding, setSavingBranding] = useState(false);

    const handleBrandingChange = (e) => {
        const { name, value } = e.target;
        setBrandingForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveBranding = async () => {
        setSavingBranding(true);
        try {
            // TODO: await saveBranding(brandingForm)  -> PATCH /settings/branding
            console.log("Save branding", brandingForm);
        } finally {
            setSavingBranding(false);
        }
    };

    // --- Security -----------------------------------------------------------
    const [securityForm, setSecurityForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [updatingPassword, setUpdatingPassword] = useState(false);

    const handleSecurityChange = (e) => {
        const { name, value } = e.target;
        setSecurityForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdatePassword = async () => {
        // TODO: validate newPassword === confirmPassword before calling the API
        setUpdatingPassword(true);
        try {
            // TODO: await updatePassword(securityForm) -> PATCH /settings/password
            console.log("Update password", securityForm);
            setSecurityForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } finally {
            setUpdatingPassword(false);
        }
    };

    // --- Default Plan -------------------------------------------------------
    const [defaultPlan, setDefaultPlan] = useState("standard_per_student");
    const [savingDefaultPlan, setSavingDefaultPlan] = useState(false);

    const handleDefaultPlanChange = (e) => setDefaultPlan(e.target.value);

    const handleSaveDefaultPlan = async () => {
        setSavingDefaultPlan(true);
        try {
            // TODO: await saveDefaultPlan(defaultPlan) -> PATCH /settings/default-plan
            console.log("Save default plan", defaultPlan);
        } finally {
            setSavingDefaultPlan(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-6xl">
            <PageHeader
                icon={SettingsIcon}
                title={"Super Admin Settings"}
                description={"Manage global system configurations, security, and defaults."}
            />

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <BrandingPanel
                    form={brandingForm}
                    onChange={handleBrandingChange}
                    onSave={handleSaveBranding}
                    saving={savingBranding}
                />

                <SecurityPanel
                    form={securityForm}
                    onChange={handleSecurityChange}
                    onSave={handleUpdatePassword}
                    saving={updatingPassword}
                />

                <DefaultPlanPanel
                    value={defaultPlan}
                    onChange={handleDefaultPlanChange}
                    onSave={handleSaveDefaultPlan}
                    saving={savingDefaultPlan}
                />
            </div>
        </div>
    );
};

export default SuperAdminSettings;