import React from 'react';

const BillingSummary = ({
    revenue,
    discountAmount,
    gstPercentage
}) => {
    const netRevenue = Number(revenue) || 0;
    const discount = Number(discountAmount) || 0;
    const gstRate = Number(gstPercentage) || 0;

    const taxableAmount = netRevenue - discount;
    const gst = taxableAmount * (gstRate / 100);
    const totalPayable = taxableAmount + gst;

    return (
        <div className="text-[11px] text-slate-500">

            <div className="space-y-1.5 w-[360px]">

                <div className="grid grid-cols-[1fr_auto] gap-10">
                    <span>Revenue</span>
                    <span className="text-slate-700">
                        ₹{netRevenue.toFixed(2)}
                    </span>
                </div>


                <div className="grid grid-cols-[1fr_auto] gap-10">
                    <span>Discount</span>
                    <span className="text-slate-700">
                        ₹{discount.toFixed(2)}
                    </span>
                </div>


                <div className="grid grid-cols-[1fr_auto] gap-10">
                    <span>GST</span>
                    <span className="text-slate-700">
                        ₹{gst.toFixed(2)}
                    </span>
                </div>


                <div className="grid grid-cols-[1fr_auto] gap-10 pt-1.5 mt-1 border-t border-slate-100">

                    <span className="font-medium text-slate-600">
                        Total
                    </span>

                    <span className="font-semibold text-indigo-600">
                        ₹{totalPayable.toFixed(2)}
                    </span>

                </div>

            </div>

        </div>
    );
};

export default BillingSummary;