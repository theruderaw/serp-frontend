import { useState, useEffect, useCallback } from 'react';
import { getGlobalStats } from '../api/system.api';

/**
 * Loads global system-wide stats for the dashboard overview.
 */
export const useGlobalStats = () => {
    const [stats, setStats] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const [error, setError] = useState('');

    const loadGlobalStats = useCallback(async () => {
        try {
            setInitializing(true);
            const data = await getGlobalStats();
            if (data) {
                setStats(data);
            } else {
                setError('No stats data found.');
            }
        } catch (e) {
            setError('Connection failed.');
        } finally {
            setInitializing(false);
        }
    }, []);

    useEffect(() => { loadGlobalStats(); }, [loadGlobalStats]);

    return { stats, initializing, error };
};