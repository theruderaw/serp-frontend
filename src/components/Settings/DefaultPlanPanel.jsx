import React from "react";
import { CreditCard, Save } from "lucide-react";

import SettingsCard from "./SettingsCard";

/**
 * Default Subscription Plan panel.
 *
 * Expected hook shape:
 *
 *   const {
 *     plans,                // [{ id, label }] -> populate the <select>, e.g.
 *                            //   fetched from GET /subscription-plans
 *     savingDefaultPlan,    // bool
 *     saveDefaultPlan,      // async (planId) => void -> PATCH /settings/default-plan
 *   } = useSystemSettings();
 *
 * `plans` is stubbed with the values visible in the mock for now — swap the
 * hardcoded <option> list for a .map(plans) once the hook exists.
 */
const DefaultPlanPanel = ({ value, onChange, onSave, saving = false }) => {
    return (
        <SettingsCard icon={CreditCard} title="Default Subscription Plan" accent="green">
            <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Select Default Plan
                </label>
                <select
                    value={value}
                    onChange={onChange}
                    className="w-full rounded-xl border-2 border-emerald-500 bg-white px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                    {/* TODO: replace with plans.map(...) from the hook */}
                    <option value="standard_per_student">Standard (Per Student)</option>
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                    <option value="enterprise">Enterprise</option>
                </select>
            </div>

            <div className="rounded-xl bg-emerald-50 px-4 py-4 text-sm leading-relaxed text-emerald-800">
                This plan will be assigned to any newly enrolled school by default
                unless overridden during enrollment.
            </div>

            <button
                type="button"
                onClick={onSave}
                disabled={saving}
                className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <Save size={16} />
                {saving ? "Saving..." : "Save Default Plan"}
            </button>
        </SettingsCard>
    );
};

export default DefaultPlanPanel;