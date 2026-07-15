import { Building2 } from 'lucide-react';

const BankHeader = () => {
    return (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-emerald-600" />
            </div>

            <div>
                <h1 className="text-3xl font-black text-slate-800 uppercase">
                    
                </h1>

                <p className="text-slate-500 mt-1">
                    Configure payment modes for the School Admin.
                </p>
            </div>
        </div>
    );
};

export default BankHeader;