import React from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

const SaveButton = ({ onClick, saving }) => (
    <button
        onClick={onClick}
        disabled={saving}
        className="flex items-center gap-2 bg-[linear-gradient(135deg,_#6366F1_0%,_#7C3AED_100%)] text-white rounded-[10px] px-6 py-2.5 text-sm font-bold
            shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_18px_rgba(99,102,241,0.4)] hover:-translate-y-px
            active:translate-y-px active:shadow-[0_2px_8px_rgba(99,102,241,0.2)]
            disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0
            transition-all duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
    >
        {saving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
        {saving ? 'Saving...' : 'Save Plan Settings'}
    </button>
);

export default SaveButton;