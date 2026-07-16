import React from "react";

/**
 * Shared card shell for each settings panel: icon + uppercase title header,
 * white body below. `accent` controls the icon color/background only.
 */
const accentMap = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
    green: "bg-emerald-50 text-emerald-600",
};

const SettingsCard = ({ icon: Icon, title, accent = "blue", children }) => {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
                <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${accentMap[accent]}`}
                >
                    <Icon size={18} />
                </span>
                <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-800">
                    {title}
                </h2>
            </div>

            <div className="flex flex-1 flex-col gap-5 px-6 py-6">{children}</div>
        </div>
    );
};

export default SettingsCard;