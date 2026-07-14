import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Loader2 } from 'lucide-react';
import api from '../api/axios.js';

import { useCurrentTime } from '../hooks/useCurrentTime';
import { useSchoolData } from '../hooks/useSchoolData';

import LoginBackground from '../components/Login/LoginBackground';
import LoginClockHeader from '../components/Login/LoginClockHeader';
import LoginBranding from '../components/Login/LoginBranding';
import LoginCard from '../components/Login/LoginCard';

// Strip the trailing /api so logo/background paths (which are host-relative) resolve correctly
const HOST = api.defaults.baseURL.replace(/\/api\/?$/, '');

const Login = () => {
    const { login } = useApp();
    const navigate = useNavigate();

    const { timeStr, dateStr } = useCurrentTime();
    const { school, schoolSettings, initializing, error: loadError } = useSchoolData();

    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState('');

    const handleLogin = async ({ identifier, password }) => {
        setLoading(true);
        setAuthError('');

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

        const payload = {
            password,
            schoolId: school?.id,
            ...(isEmail
                ? { email: identifier }
                : { name: identifier }),
        };

        const success = await login(payload);

        if (success) {
            navigate('/dashboard');
        } else {
            setAuthError('Access Denied.');
        }

        setLoading(false);
    };
    
    if (initializing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <Loader2 className="animate-spin text-white/20" size={24} />
            </div>
        );
    }

    const logoUrl = schoolSettings?.logo ? (schoolSettings.logo.startsWith('http') ? schoolSettings.logo : `${HOST}${schoolSettings.logo}`) : null;
    const bgUrl = schoolSettings?.loginBg ? (schoolSettings.loginBg.startsWith('http') ? schoolSettings.loginBg : `${HOST}${schoolSettings.loginBg}`) : null;
    const showName = schoolSettings?.loginShowName !== false;
    const showLogo = schoolSettings?.loginShowLogo !== false;
    const brandingTitle = showName ? (schoolSettings?.schoolName || school?.name || 'School ERP Login') : 'Login';

    return (
        <div
            className="min-h-screen flex items-center justify-start relative overflow-hidden selection:bg-orange-500/30"
            style={bgUrl ? { background: `url(${bgUrl}) center/cover no-repeat` } : undefined}
        >
            <LoginBackground bgUrl={bgUrl} />

            <div className="relative z-10 ml-[12%] flex flex-col items-center">
                <LoginClockHeader timeStr={timeStr} dateStr={dateStr} />

                <div className="w-[240px] animate-in fade-in zoom-in-95 duration-700">
                    <LoginBranding showLogo={showLogo} logoUrl={logoUrl} title={brandingTitle} />

                    <LoginCard
                        showLogo={showLogo}
                        logoUrl={logoUrl}
                        error={authError || loadError}
                        onSubmit={handleLogin}
                        loading={loading}
                    />
                </div>
            </div>

            <div className="absolute right-12 bottom-12 rotate-90 origin-right opacity-5 text-white text-[8px] font-black uppercase tracking-[1em] pointer-events-none">
                School ERP Ecosystem
            </div>
        </div>
    );
};

export default Login;