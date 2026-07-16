import { useState } from 'react';
import { Bell } from 'lucide-react';
import Modal from '../components/common/Modal';

/**
 * NotificationBell
 *
 * TODO: wire up to real notifications, e.g. via a useNotifications() hook:
 *   const { unreadCount, notifications, markAllRead } = useNotifications();
 * - hide the red dot when unreadCount === 0
 * - swap the placeholder "Hello world" modal body for a real notifications list
 */
const NotificationBell = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors duration-150"
            >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
            </button>

            <Modal open={open} onClose={() => setOpen(false)}>
                <p className="text-base font-semibold text-slate-800">Hello world</p>
                <p className="mt-1 text-sm text-slate-400">Press esc to close</p>
            </Modal>
        </>
    );
};

export default NotificationBell;