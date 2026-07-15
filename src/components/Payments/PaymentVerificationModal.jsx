// src/components/SubscriptionPayments/PaymentVerificationModal.jsx

import React from "react";
import { XCircle } from "lucide-react";

const PaymentVerificationModal = ({
    payment,
    form,
    setForm,
    processing,
    onClose,
    onSubmit,
}) => {
    if (!payment) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="flex max-h-[90vh] w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-5">
                    <h2 className="text-lg font-bold text-slate-800">
                        Payment Verification
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <XCircle size={20} />
                    </button>
                </div>

                <div className="space-y-4 overflow-y-auto p-6">
                    <div className="space-y-1 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm">
                        <p className="text-lg font-bold text-slate-800">
                            Amount: ₹{payment.amount}
                        </p>

                        <p className="text-slate-600">
                            Mode:{" "}
                            <strong>
                                {payment.paymentMode}
                            </strong>
                        </p>

                        {payment.school_remark && (
                            <p className="mt-2 border-t border-slate-200 pt-2 text-slate-600">
                                <strong>
                                    School Remark:
                                </strong>
                                <br />
                                {
                                    payment.school_remark
                                }
                            </p>
                        )}

                        {payment.receiptUrl && (
                            <div className="mt-3 border-t border-slate-200 pt-2">
                                <a
                                    href={`http://localhost:5000${payment.receiptUrl}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline"
                                >
                                    Open Uploaded Receipt Image
                                </a>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-bold text-slate-500">
                            Set Status
                        </label>

                        <select
                            value={form.status}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    status:
                                        e.target
                                            .value,
                                })
                            }
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold outline-none focus:border-indigo-500"
                        >
                            <option value="Verified">
                                Approve (Verified)
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Rejected">
                                Reject
                            </option>
                        </select>
                    </div>

                    {form.status ===
                        "Verified" && (
                        <div>
                            <label className="mb-1 block text-xs font-bold text-slate-500">
                                Extend Validity
                                Until
                            </label>

                            <input
                                type="date"
                                value={
                                    form.validUntil
                                }
                                onChange={(
                                    e
                                ) =>
                                    setForm({
                                        ...form,
                                        validUntil:
                                            e
                                                .target
                                                .value,
                                    })
                                }
                                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium outline-none focus:border-indigo-500"
                            />
                        </div>
                    )}

                    <div>
                        <label className="mb-1 block text-xs font-bold text-slate-500">
                            Super Admin
                            Remark
                        </label>

                        <input
                            type="text"
                            value={form.remark}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    remark:
                                        e.target
                                            .value,
                                })
                            }
                            placeholder="e.g. Payment verified, valid for 1 month"
                            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 p-5">
                    <button
                        onClick={onClose}
                        className="rounded-lg px-5 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onSubmit}
                        disabled={
                            (form.status ===
                                "Verified" &&
                                !form.validUntil) ||
                            processing
                        }
                        className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
                    >
                        Save Status
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentVerificationModal;