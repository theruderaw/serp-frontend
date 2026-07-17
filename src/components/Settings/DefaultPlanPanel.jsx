import React, {
    useEffect,
    useState,
} from "react";
import {
    CreditCard,
    Save,
} from "lucide-react";

import useSettings from "../../hooks/useSettings";
import { SCHOOL_ID } from "../../config/school";

import SettingsCard from "./SettingsCard";

const DefaultPlanPanel = () => {
    const {
        settings,
        processing,
        updatePlan,
    } = useSettings(SCHOOL_ID);

    const [plan, setPlan] =
        useState("basic");

    useEffect(() => {
        if (settings?.plan) {
            setPlan(settings.plan);
        }
    }, [settings]);

    const handleSave = async () => {
        await updatePlan(plan);
    };

    return (
        <SettingsCard
            icon={CreditCard}
            title="Default Subscription Plan"
            accent="green"
        >
            <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Select Default Plan
                </label>

                <select
                    value={plan}
                    onChange={(e) =>
                        setPlan(
                            e.target.value
                        )
                    }
                    className="w-full rounded-xl border-2 border-emerald-500 bg-white px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                    <option value="basic">
                        Basic
                    </option>
                    <option value="pro">
                        Pro
                    </option>
                    <option value="enterprise">
                        Enterprise
                    </option>
                </select>
            </div>

            <div className="rounded-xl bg-emerald-50 px-4 py-4 text-sm leading-relaxed text-emerald-800">
                This plan determines the
                subscription tier assigned to
                this school.
            </div>

            <button
                type="button"
                onClick={handleSave}
                disabled={processing}
                className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <Save size={16} />
                {processing
                    ? "Saving..."
                    : "Save Plan"}
            </button>
        </SettingsCard>
    );
};

export default DefaultPlanPanel;