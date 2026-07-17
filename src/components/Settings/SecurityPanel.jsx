import React, { useState } from "react";
import { ShieldAlert, Lock, Save } from "lucide-react";

import useSettings from "../../hooks/useSettings";

import SettingsCard from "./SettingsCard";
import IconField from "./IconField";
import { SCHOOL_ID } from "../../config/school";

const SecurityPanel = () => {
    const { processing, resetAdminPassword } = useSettings(SCHOOL_ID);

    const [form, setForm] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!form.newPassword.trim()) {
            alert("Please enter a new password.");
            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Fires the actual request, e.g. PATCH /schools/:id/admin-password
        await resetAdminPassword(form.newPassword);

        setForm({ newPassword: "", confirmPassword: "" });
    };

    return (
        <SettingsCard icon={ShieldAlert} title="Security Settings" accent="red">
            <IconField
                label="New Password"
                icon={Lock}
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                autoComplete="new-password"
            />

            <IconField
                label="Confirm New Password"
                icon={Lock}
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
            />

            <button
                type="button"
                onClick={handleSave}
                disabled={processing}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <Save size={16} />
                {processing ? "Updating..." : "Update Password"}
            </button>
        </SettingsCard>
    );
};

export default SecurityPanel;