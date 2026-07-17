import React from "react";

const ACCENT_STYLES = {
    blue: "border-blue-100 bg-blue-50 text-blue-600",
    green: "border-emerald-100 bg-emerald-50 text-emerald-600",
    red: "border-red-100 bg-red-50 text-red-600",
};

const SettingsCard = ({ icon: Icon, title, accent = "blue", children }) => {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border ${ACCENT_STYLES[accent] ?? ACCENT_STYLES.blue}`}
                >
                    {Icon && <Icon size={20} />}
                </div>
                <h3 className="text-base font-bold text-slate-800">{title}</h3>
            </div>
            <div className="flex flex-1 flex-col gap-4">{children}</div>
        </div>
    );
};

export default SettingsCard;