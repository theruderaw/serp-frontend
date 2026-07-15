import { CheckCircle, XCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
    const active = status === 'active';

    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide ${
                active
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-rose-100 text-rose-700'
            }`}
        >
            {active ? (
                <CheckCircle size={14} />
            ) : (
                <XCircle size={14} />
            )}

            {active ? 'Active' : 'Suspended'}
        </span>
    );
};

export default StatusBadge;