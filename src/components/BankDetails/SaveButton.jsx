import { CheckCircle } from 'lucide-react';

const SaveButton = ({ processing, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={processing}
            className="
                inline-flex items-center gap-2
                rounded-lg
                bg-indigo-600
                px-6 py-3
                font-semibold text-white
                transition
                hover:bg-indigo-700
                disabled:cursor-not-allowed
                disabled:opacity-50
            "
        >
            <CheckCircle size={18} />

            {processing ? 'Saving...' : 'Save Settings'}
        </button>
    );
};

export default SaveButton;