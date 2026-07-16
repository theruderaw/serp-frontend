import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import NotificationBell from './NotificationBell';

const Topbar = () => {
    const { user } = useApp();

    const name = user?.name || 'User';
    const role = user?.role || 'Admin';
    const initial = name.charAt(0).toUpperCase();

    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const time = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    const date = now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const day = now.toLocaleDateString('en-IN', {
        weekday: 'long',
    });

    return (
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-100 bg-white">
            {/* Left */}
            <div className="flex items-center gap-4">
                <div className="flex h-10 min-w-[110px] flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-4">
                    <span className="text-lg font-bold tracking-wider text-slate-800">
                        {time}
                    </span>
                </div>

                <div className="flex h-10 min-w-[160px] flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-4">
                    <span className="text-xs font-semibold text-slate-800">
                        {date}
                    </span>
                    <span className="text-[11px] text-slate-500">
                        {day}
                    </span>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                <NotificationBell />

                <div className="flex items-center gap-2.5 pl-3 border-l border-slate-100">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
                        {initial}
                    </div>

                    <div className="text-right">
                        <p className="text-sm font-semibold text-slate-800 leading-tight">
                            {name}
                        </p>

                        <p className="text-xs text-slate-400 leading-tight">
                            {role}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;