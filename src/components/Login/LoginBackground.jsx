import React from 'react';

const LoginBackground = ({ bgUrl }) => (
    <>
        {!bgUrl && (
            <div className="absolute inset-0 z-0 bg-[linear-gradient(135deg,_#0f0f1a_0%,_#1a1a2e_40%,_#16213e_70%,_#0f3460_100%)]" />
        )}
        {bgUrl && <div className="absolute inset-0 z-0 bg-black/40" />}
        <div className="absolute inset-0 z-0 backdrop-blur-[2px]" />
    </>
);

export default LoginBackground;