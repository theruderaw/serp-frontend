import React from 'react';

const FIELD_CLASSES =
    "w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none " +
    "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-150 " +
    "placeholder:text-slate-300";

const BillingAdjustmentForm = ({
    discountAmount,
    discountText,
    gstPercentage,
    onChangeDiscountAmount,
    onChangeDiscountText,
    onChangeGstPercentage
}) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-slate-100">

        <div className="pt-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
                Discount Amount (₹)
            </label>

            <input
                type="number"
                value={discountAmount}
                onChange={(e) => onChangeDiscountAmount(e.target.value)}
                placeholder="e.g. 500"
                className={FIELD_CLASSES}
            />
        </div>


        <div className="pt-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
                Discount Text / Offer Details
            </label>

            <input
                type="text"
                value={discountText}
                onChange={(e) => onChangeDiscountText(e.target.value)}
                placeholder="e.g. Annual discount offer"
                className={FIELD_CLASSES}
            />
        </div>


        <div className="pt-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
                GST Percentage (%)
            </label>

            <input
                type="number"
                value={gstPercentage}
                onChange={(e) => onChangeGstPercentage(e.target.value)}
                placeholder="e.g. 18"
                className={FIELD_CLASSES}
            />
        </div>

    </div>
);

export default BillingAdjustmentForm;