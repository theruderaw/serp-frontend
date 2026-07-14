import React from 'react';
import { Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Topbar = () => {
    const { user } = useApp();

    const name = user?.name || 'User';
    const role = user?.role || 'Admin';
    const initial = name.charAt(0).toUpperCase();

    return (
        <header className="h-16 flex items-center justify-end gap-4 px-6 border-b border-slate-100 bg-white">
            <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors duration-150">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
            </button>

            <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors duration-150">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
            </button>

            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-100">
                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
                    {initial}
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800 leading-tight">{name}</p>
                    <p className="text-xs text-slate-400 leading-tight">{role}</p>
                </div>
            </div>
        </header>
    );
};

export default Topbar;