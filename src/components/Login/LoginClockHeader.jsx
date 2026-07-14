import React from 'react';

const LoginClockHeader = ({ timeStr, dateStr }) => (
    <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
        <h2 className="text-white text-[13px] font-semibold uppercase tracking-[0.05em] mb-1">Welcome!</h2>
        <h1 className="text-white/60 text-[11px] font-medium tracking-[0.2em] uppercase">{timeStr}</h1>
        <p className="text-white/20 text-[7px] font-medium tracking-[0.2em] mt-0.5 uppercase">{dateStr}</p>
    </div>
);

export default LoginClockHeader;