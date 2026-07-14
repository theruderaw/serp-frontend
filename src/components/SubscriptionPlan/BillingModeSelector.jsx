import React from 'react';

const BillingModeSelector = ({ billingMode, onChange }) => {
    return (
        <div>
            <label className="block text-xs font-bold text-slate-500 mb-3">
                Billing Mode
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Cumulative */}
                <label
                    className={`
                        flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition
                        ${
                            billingMode === 'Cumulative'
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-slate-200 hover:bg-slate-50'
                        }
                    `}
                >
                    <input
                        type="radio"
                        name="billingMode"
                        value="Cumulative"
                        checked={billingMode === 'Cumulative'}
                        onChange={(e) => onChange(e.target.value)}
                        className="mt-1 w-4 h-4 text-indigo-600"
                    />

                    <div>
                        <h3 className="text-sm font-bold text-slate-800">
                            Cumulative / Flat Rate
                        </h3>

                        <p className="text-xs text-slate-500 mt-1">
                            Charge a fixed amount regardless of student count.
                        </p>
                    </div>

                </label>



                {/* Per Student */}
                <label
                    className={`
                        flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition
                        ${
                            billingMode === 'Per Student'
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-slate-200 hover:bg-slate-50'
                        }
                    `}
                >
                    <input
                        type="radio"
                        name="billingMode"
                        value="Per Student"
                        checked={billingMode === 'Per Student'}
                        onChange={(e) => onChange(e.target.value)}
                        className="mt-1 w-4 h-4 text-indigo-600"
                    />

                    <div>
                        <h3 className="text-sm font-bold text-slate-800">
                            Per Student
                        </h3>

                        <p className="text-xs text-slate-500 mt-1">
                            Charge based on active student count.
                        </p>
                    </div>

                </label>

            </div>
        </div>
    );
};

export default BillingModeSelector;