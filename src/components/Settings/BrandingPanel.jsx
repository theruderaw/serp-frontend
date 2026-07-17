import { useEffect, useState } from "react";
import {
    Building2,
    Image as ImageIcon,
    Save,
} from "lucide-react";

import { updateCompany } from "../../api/schools.api";
import { useSchoolData } from "../../hooks/useSchoolData";

import SettingsCard from "./SettingsCard";
import IconField from "./IconField";
import { SCHOOL_ID } from "../../config/school";

const BrandingPanel = () => {
    const { schoolSettings } =
        useSchoolData();

    const [processing, setProcessing] =
        useState(false);

    const [form, setForm] = useState({
        name: "",
        logo: "",
    });

    useEffect(() => {
        setForm({
            name:
                schoolSettings?.schoolName ??
                "",
            logo:
                schoolSettings?.logo ??
                "",
        });
    }, [schoolSettings]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            setProcessing(true);

            await updateCompany(
                SCHOOL_ID,
                {
                    name: form.name,
                    logo: form.logo,
                }
            );
        } finally {
            setProcessing(false);
        }
    };

    return (
        <SettingsCard
            icon={Building2}
            title="Company Branding"
            accent="blue"
        >
            <IconField
                label="School Name"
                icon={Building2}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Springfield High School"
            />

            <IconField
                label="Logo URL"
                icon={ImageIcon}
                name="logo"
                value={form.logo}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
            />

            <button
                type="button"
                onClick={handleSave}
                disabled={processing}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <Save size={16} />
                {processing
                    ? "Saving..."
                    : "Save Branding"}
            </button>
        </SettingsCard>
    );
};

export default BrandingPanel;