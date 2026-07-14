import React from 'react';
import ErrorMessage from './ErrorMessage';
import LoginForm from './LoginForm';

const LoginCard = ({ showLogo, logoUrl, error, onSubmit, loading }) => (
    <div className="bg-white/[0.04] backdrop-blur-lg border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] rounded-md p-4 space-y-4">
        {showLogo && logoUrl && (
            <div className="flex justify-center pb-1">
                <img src={logoUrl} alt="School Logo" className="w-14 h-14 object-contain rounded-xl shadow-lg" />
            </div>
        )}

        <ErrorMessage message={error} />

        <LoginForm onSubmit={onSubmit} loading={loading} />
    </div>
);

export default LoginCard;