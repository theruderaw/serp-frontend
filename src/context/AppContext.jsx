import { createContext, useContext, useState, useCallback } from 'react';
import { login as loginApi, logout as logoutApi } from '../api/auth.api';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);

    const login = useCallback(async (payload) => {
    setAuthLoading(true);

    try {
        const data = await loginApi(payload);

        if (data?.token) {
            setUser(data.user ?? payload);
            return true;
        }

        return false;
    } catch {
        return false;
    } finally {
        setAuthLoading(false);
    }
}, []);
    const logout = useCallback(() => {
        logoutApi();
        setUser(null);
    }, []);

    const value = { user, login, logout, authLoading, isAuthenticated: !!user };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within an AppProvider');
    return ctx;
};