// src/components/SubscriptionPayments/PaymentTable.jsx

import React from "react";

import PaymentRow from "./PaymentRow";

const PaymentTable = ({
    payments,
    onVerify,
    onEdit,
}) => {
    if (payments.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-8 text-center text-sm text-slate-500">
                    No payments recorded yet.
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="p-4 font-bold uppercase tracking-wider text-slate-500">
                                Date
                            </th>
                            <th className="p-4 font-bold uppercase tracking-wider text-slate-500">
                                Amount
                            </th>
                            <th className="p-4 font-bold uppercase tracking-wider text-slate-500">
                                Mode & Remark
                            </th>
                            <th className="p-4 font-bold uppercase tracking-wider text-slate-500">
                                Status
                            </th>
                            <th className="p-4 font-bold uppercase tracking-wider text-slate-500">
                                Valid Until
                            </th>
                            <th className="p-4 font-bold uppercase tracking-wider text-slate-500">
                                Receipt
                            </th>
                            <th className="p-4 text-right font-bold uppercase tracking-wider text-slate-500">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {payments.map((payment) => (
                            <PaymentRow
                                key={payment.id}
                                payment={payment}
                                onVerify={onVerify}
                                onEdit={onEdit}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentTable;