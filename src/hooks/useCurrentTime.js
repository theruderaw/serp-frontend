import { useState, useEffect } from 'react';

/**
 * Tracks the current time, ticking every second, and exposes
 * pre-formatted strings for display.
 */
export const useCurrentTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const dateStr = currentTime.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' });

    return { currentTime, timeStr, dateStr };
};