import { Phone, Mail, User } from 'lucide-react';

// TODO: pull from a config/hook (e.g. useSystemSettings) instead of hardcoding
const SUPPORT_CONTACTS = [
    { icon: Phone, label: '+91 6200942238', href: 'tel:+916200942238' },
    { icon: Phone, label: '+91 6513182122', href: 'tel:+916513182122' },
    { icon: Mail, label: 'help@digitrand.com', href: 'mailto:help@digitrand.com' },
];

const SupportCard = () => {
    return (
        <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 p-4">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                    <User size={16} />
                </div>
                <p className="text-xs font-bold uppercase tracking-wide text-indigo-700">
                    Support
                </p>
            </div>

            <div className="space-y-2.5">
                {SUPPORT_CONTACTS.map(({ icon: Icon, label, href }) => (
                    <a
                        key={label}
                        href={href}
                        className="flex items-center gap-2.5 text-[13px] font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-150"
                    >
                        <Icon size={14} className="shrink-0 text-slate-400" />
                        <span className="truncate">{label}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SupportCard;