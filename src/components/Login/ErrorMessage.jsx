import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return (
        <div className="text-[8px] font-bold text-orange-400 flex items-center gap-1 mt-1">
            <AlertCircle size={10} /><span>{message}</span>
        </div>
    );
};

export default ErrorMessage;