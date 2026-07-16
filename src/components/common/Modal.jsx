import  { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Modal
 *
 * Generic overlay modal. Closes on Escape key or backdrop click.
 * Usage: <Modal open={open} onClose={() => setOpen(false)}>content</Modal>
 */
const Modal = ({ open, onClose, children }) => {
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose?.();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative min-w-[280px] rounded-2xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                    <X size={16} />
                </button>

                {children}
            </div>
        </div>
    );
};

export default Modal;