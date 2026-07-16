import React from "react";
import { ShieldAlert, Lock, Save } from "lucide-react";

import SettingsCard from "./SettingsCard";
import IconField from "./IconField";

/**
 * Security Settings panel (password change).
 *
 * Expected hook shape:
 *
 *   const {
 *     updatingPassword,          // bool
 *     updatePassword,            // async ({ currentPassword, newPassword }) => void
 *   } = useSystemSettings();
 *
 * Validation to add once wired up:
 *   - newPassword !== "" and newPassword === confirmPassword before calling onSave
 *   - surface backend error (e.g. wrong current password) via a toast/inline error
 *   - clear all three fields on success
 */
const SecurityPanel = ({ form, onChange, onSave, saving = false }) => {
    return (
        <SettingsCard icon={ShieldAlert} title="Security Settings" accent="red">
            <IconField
                label="Current Password"
                icon={Lock}
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={onChange}
                autoComplete="current-password"
            />

            <IconField
                label="New Password"
                icon={Lock}
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={onChange}
                autoComplete="new-password"
            />

            <IconField
                label="Confirm New Password"
                icon={Lock}
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={onChange}
                autoComplete="new-password"
            />

            <button
                type="button"
                onClick={onSave}
                disabled={saving}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <Save size={16} />
                {saving ? "Updating..." : "Update Password"}
            </button>
        </SettingsCard>
    );
};

export default SecurityPanel;