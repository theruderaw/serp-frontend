import React from 'react';
import { School as SchoolIcon } from 'lucide-react';

const LoginBranding = ({ showLogo, logoUrl, title }) => (
    <div className="flex items-center gap-2 mb-2 ml-1 opacity-90">
        {showLogo && logoUrl ? (
            <img src={logoUrl} alt="" className="w-5 h-5 object-contain rounded" />
        ) : (
            <SchoolIcon size={10} className="text-white" />
        )}
        <span className="text-[8px] font-black uppercase tracking-[0.1em] text-white">
            {title}
        </span>
    </div>
);

export default LoginBranding;