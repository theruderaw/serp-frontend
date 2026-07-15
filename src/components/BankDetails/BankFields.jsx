const BankFields = ({ bankForm, setBankForm }) => {
    const handleChange = (field) => (e) => {
        setBankForm(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    return (
        <div className="space-y-6">

            <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                    UPI ID
                </label>

                <input
                    type="text"
                    value={bankForm.upiId}
                    onChange={handleChange('upiId')}
                    placeholder="example@upi"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
            </div>

            <div className="grid grid-cols-2 gap-5">

                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">
                        Bank Name
                    </label>

                    <input
                        type="text"
                        value={bankForm.bankName}
                        onChange={handleChange('bankName')}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">
                        Account Number
                    </label>

                    <input
                        type="text"
                        value={bankForm.bankAccountNo}
                        onChange={handleChange('bankAccountNo')}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">
                        IFSC Code
                    </label>

                    <input
                        type="text"
                        value={bankForm.bankIfsc}
                        onChange={handleChange('bankIfsc')}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 uppercase outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">
                        Branch Name
                    </label>

                    <input
                        type="text"
                        value={bankForm.bankBranch}
                        onChange={handleChange('bankBranch')}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>

            </div>

        </div>
    );
};

export default BankFields;