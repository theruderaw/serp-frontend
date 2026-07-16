import React, { useState } from 'react';
import { useGlobalStats } from '../hooks/useGlobalStats';
import { School, UserCheck, Users, Briefcase, Bell, XCircle } from 'lucide-react';
import { createReminder } from '../api/reminders.api';
import { getSchools } from '../api/schools.api';
import { SCHOOL_ID } from '../config/school';

const GRADIENTS = {
    pink: {
        bg: 'bg-[linear-gradient(135deg,_#FF6B8A_0%,_#FF8E6E_100%)]',
        shadow: 'shadow-[0_6px_20px_rgba(255,107,138,0.35)]',
    },
    blue: {
        bg: 'bg-[linear-gradient(135deg,_#4E9BF5_0%,_#6B7FFF_100%)]',
        shadow: 'shadow-[0_6px_20px_rgba(78,155,245,0.35)]',
    },
    teal: {
        bg: 'bg-[linear-gradient(135deg,_#43C6AC_0%,_#44B9A8_100%)]',
        shadow: 'shadow-[0_6px_20px_rgba(67,198,172,0.35)]',
    },
    indigo: {
        bg: 'bg-[linear-gradient(135deg,_#6366F1_0%,_#818CF8_100%)]',
        shadow: 'shadow-[0_6px_20px_rgba(99,102,241,0.35)]',
    },
};

const GradCard = ({ title, value, subtext, icon: Icon, variant }) => {
    const { bg, shadow } = GRADIENTS[variant];

    return (
        <div
            className={`relative overflow-hidden rounded-2xl p-5 text-white select-none
                transition-transform duration-[180ms] ease-out hover:-translate-y-[3px] hover:scale-[1.01] active:translate-y-0 active:scale-[0.99]
                ${bg} ${shadow}`}
        >
            <div className="absolute w-[120px] h-[120px] rounded-full bg-white/[0.12] -right-5 -top-5 pointer-events-none" />
            <div className="absolute w-[80px] h-[80px] rounded-full bg-white/[0.08] right-10 -bottom-5 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex out items-center justify-center">
                    <Icon size={18} />
                </div>

                <div>
                    <p className="text-white/80 text-[10px] font-bold uppercase tracking-wider mb-1">
                        {title}
                    </p>

                    <p className="text-2xl font-black leading-none">
                        {value}
                    </p>

                    {subtext && (
                        <p className="text-white/70 text-[10px] font-semibold mt-1">
                            {subtext}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const { stats, initializing, error } = useGlobalStats();

    const [showReminderModal, setShowReminderModal] = useState(false);
    const [reminderText, setReminderText] = useState('');
    const [sendingReminder, setSendingReminder] = useState(false);

    const totalSchools = stats?.totalschools ?? 0;
    const activeSchools = stats?.activeschools ?? 0;
    const totalStudents = stats?.totalstudents ?? 0;
    const totalEmployees = stats?.totalemployees ?? 0;

    const fmt = (n) => (initializing ? '—' : Number(n).toLocaleString());

    const handleSendReminder = async () => {
        if (!reminderText.trim()) return;

        setSendingReminder(true);

        try {
            const schools = await getSchools();
            const school = schools?.[0];

            if (!school) {
                alert('No school found');
                return;
            }

            await createReminder({
                schoolId: SCHOOL_ID,
                message: reminderText,
            });

            alert('Reminder sent successfully');
            setReminderText('');
            setShowReminderModal(false);

        } catch (error) {
            console.error('Reminder error:', error);
            alert('Failed to send reminder');
        } finally {
            setSendingReminder(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Dashboard Overview
                    </h1>

                    <p className="text-slate-400 text-sm mt-0.5">
                        Quick glance at your ERP usage
                    </p>
                </div>

                <button
                    onClick={() => setShowReminderModal(true)}
                    className="bg-[linear-gradient(135deg,_#6366F1_0%,_#7C3AED_100%)] text-white rounded-[10px] px-[18px] py-2 text-[13px] font-semibold
                    shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_18px_rgba(99,102,241,0.4)] hover:-translate-y-px
                    active:translate-y-px active:shadow-[0_2px_8px_rgba(99,102,241,0.2)]
                    transition-all duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex items-center gap-2"
                >
                    <Bell size={14} />
                    Send Reminder
                </button>
            </div>

            {error && (
                <div className="text-sm text-red-500 bg-red-50 rounded-lg p-3">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <GradCard
                    title="Total Schools"
                    value={fmt(totalSchools)}
                    subtext={initializing ? '' : `${fmt(activeSchools)} active`}
                    icon={School}
                    variant="pink"
                />

                <GradCard
                    title="Active Schools"
                    value={fmt(activeSchools)}
                    icon={UserCheck}
                    variant="blue"
                />

                <GradCard
                    title="Total Students"
                    value={fmt(totalStudents)}
                    icon={Users}
                    variant="teal"
                />

                <GradCard
                    title="Total Employees"
                    value={fmt(totalEmployees)}
                    icon={Briefcase}
                    variant="indigo"
                />
            </div>

            <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100 p-8 text-center mt-8">
                <h2 className="text-xl font-bold text-slate-800 mb-2">
                    Welcome to Super Admin
                </h2>

                <p className="text-slate-500 text-sm">
                    Use the left sidebar to navigate to Subscription Plan, Bank Details, Service Control, and Payment Approvals.
                </p>
            </div>

            {showReminderModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">

                        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2">
                                <Bell size={18} />
                                Send Reminder
                            </h2>

                            <button
                                onClick={() => setShowReminderModal(false)}
                                className="text-slate-400 hover:text-slate-700"
                            >
                                <XCircle size={20} />
                            </button>
                        </div>

                        <div className="p-5">
                            <textarea
                                value={reminderText}
                                onChange={(e) => setReminderText(e.target.value)}
                                rows={4}
                                placeholder="Write reminder message..."
                                className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-indigo-500 resize-none"
                            />
                        </div>

                        <div className="p-5 border-t border-slate-100 flex justify-end gap-3">
                            <button
                                onClick={() => setShowReminderModal(false)}
                                className="px-4 py-2 text-sm font-semibold text-slate-600"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSendReminder}
                                disabled={sendingReminder || !reminderText.trim()}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50"
                            >
                                {sendingReminder ? 'Sending...' : 'Send'}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;