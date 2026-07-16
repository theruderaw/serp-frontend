import React from "react";

/**
 * Icon-prefixed labeled input, matches the bordered "icon inside field" style
 * used across Settings (Company Name, Passwords, Logo URL, etc).
 */
const IconField = ({
    label,
    icon: Icon,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    autoComplete,
}) => {
    return (
        <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon
                        size={18}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className={`w-full rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 placeholder:font-normal placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 ${
                        Icon ? "pl-11 pr-3" : "px-3"
                    }`}
                />
            </div>
        </div>
    );
};

export default IconField;