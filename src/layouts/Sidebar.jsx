import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    CreditCard,
    Landmark,
    ShieldCheck,
    Wallet,
    LogOut,
    Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const NAV_ITEMS = [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { label: 'Subscription Plan', to: '/subscription-plan', icon: CreditCard },
    { label: 'Bank Details', to: '/bank-details', icon: Landmark },
    { label: 'Service Control', to: '/service-control', icon: ShieldCheck },
    { label: 'Payment Approvals', to: '/payment-approvals', icon: Wallet },
];

const Sidebar = () => {
    const navigate = useNavigate();
    const { logout } = useApp();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <aside className="hidden md:flex md:w-72 md:flex-col bg-white border-r border-slate-100 px-4 py-5">
            {/* Branding */}
            <div className="flex items-center gap-3 px-2 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[linear-gradient(135deg,_#6366F1_0%,_#7C3AED_100%)] flex items-center justify-center text-white text-xs font-black">
                    ERP
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">Super Admin Panel</p>
                    <p className="text-xs text-slate-400 truncate">Vidyam ERP</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-1">
                {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 ${
                                isActive
                                    ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                    : 'text-slate-500 hover:bg-indigo-50/60 hover:text-indigo-600'
                            }`
                        }
                    >
                        <Icon size={16} />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom */}
            <div className="space-y-1 pt-4 border-t border-slate-100">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-semibold text-red-500 hover:bg-red-50 transition-colors duration-150"
                >
                    <LogOut size={16} />
                    <span>Logout</span>
                </button>
                <div className="flex items-center gap-2.5 px-3 py-2 text-[12px] text-slate-400">
                    <Info size={14} />
                    <span>About Vidyam ERP</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;