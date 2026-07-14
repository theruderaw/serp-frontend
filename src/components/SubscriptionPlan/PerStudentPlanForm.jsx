import React from 'react';

const FIELD_CLASSES =
    "w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none " +
    "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-150 " +
    "placeholder:text-slate-300";

const PerStudentPlanForm = ({
    monthlyPrice,
    yearlyPrice,
    onChangeMonthly,
    onChangeYearly
}) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
                Monthly Price / Student (₹)
            </label>

            <input
                type="number"
                value={monthlyPrice}
                onChange={(e) => {
                    const value = e.target.value;

                    onChangeMonthly(value);
                    onChangeYearly(value ? Number(value) * 12 : '');
                }}
                placeholder="e.g. 500"
                className={FIELD_CLASSES}
            />
        </div>


        <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
                Yearly Price / Student (₹)
            </label>

            <input
                type="number"
                value={yearlyPrice}
                onChange={(e) => {
                    const value = e.target.value;

                    onChangeYearly(value);
                    onChangeMonthly(value ? Number(value) / 12 : '');
                }}
                placeholder="e.g. 6000"
                className={FIELD_CLASSES}
            />
        </div>

    </div>
);

export default PerStudentPlanForm;