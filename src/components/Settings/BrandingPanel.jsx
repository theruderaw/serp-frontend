import React from "react";
import { Building2, Image as ImageIcon, Save } from "lucide-react";

import SettingsCard from "./SettingsCard";
import IconField from "./IconField";

/**
 * Company Branding panel.
 *
 * Controlled from the parent (SuperAdminSettings) so the eventual data hook
 * only needs to live in one place. Expected shape from a `useSystemSettings`
 * (or similar) hook:
 *
 *   const {
 *     branding,            // { companyName, logoUrl }
 *     savingBranding,      // bool, disables the button + shows spinner state
 *     saveBranding,        // async (payload) => void  -> PATCH /settings/branding
 *   } = useSystemSettings();
 *
 * onChange here just needs to bubble field updates up; onSave should call
 * saveBranding(form) and probably toast on success/failure.
 */
const BrandingPanel = ({ form, onChange, onSave, saving = false }) => {
    return (
        <SettingsCard icon={Building2} title="Company Branding" accent="blue">
            <IconField
                label="Company Name"
                icon={Building2}
                name="companyName"
                value={form.companyName}
                onChange={onChange}
                placeholder="DigiTrand ERP"
            />

            <IconField
                label="Logo URL"
                icon={ImageIcon}
                name="logoUrl"
                value={form.logoUrl}
                onChange={onChange}
                placeholder="https://digitrand.com/logo"
            />

            <button
                type="button"
                onClick={onSave}
                disabled={saving}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <Save size={16} />
                {saving ? "Saving..." : "Save Branding"}
            </button>
        </SettingsCard>
    );
};

export default BrandingPanel;