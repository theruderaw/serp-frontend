import { RefreshCcw } from 'lucide-react';

const AdminSecurityCard = ({
    processing,
    onReset,
}) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-black text-slate-800">
                Admin Security
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
                Reset the School Administrator's password back to the default
                credentials if they lose access to their account.
            </p>

            <button
                onClick={onReset}
                disabled={processing}
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-6 font-semibold text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <RefreshCcw size={18} />
                Reset School Admin Password
            </button>
        </div>
    );
};

export default AdminSecurityCard;