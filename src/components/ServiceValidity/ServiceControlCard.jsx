import { Power } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ServiceControlCard = ({
    school,
    processing,
    onToggle,
}) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-black text-slate-800">
                Service Control
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
                Enable or disable ERP services for this school. When disabled,
                administrators, staff, and students will lose access until the
                subscription is restored.
            </p>

            <div className="mt-8 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Current Status
                </span>

                <StatusBadge status={school.status} />
            </div>

            <button
                onClick={onToggle}
                disabled={processing}
                className={`mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-lg border font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                    school.status === 'active'
                        ? 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100'
                        : 'border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
            >
                <Power size={18} />

                {school.status === 'active'
                    ? 'Disable Services'
                    : 'Enable Services'}
            </button>
        </div>
    );
};

export default ServiceControlCard;