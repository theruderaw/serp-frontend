// src/components/SubscriptionPayments/PaymentRow.jsx

const PaymentRow = ({
    payment,
    onVerify,
    onEdit,
}) => {
    return (
        <tr className="hover:bg-slate-50/50">
            <td className="p-4 font-medium text-slate-700">
                {new Date(
                    payment.createdAt
                ).toLocaleDateString()}
            </td>

            <td className="p-4 font-bold text-slate-800 text-sm">
                ₹{payment.amount}
            </td>

            <td className="p-4">
                <div className="flex flex-col">
                    <span className="font-bold text-slate-700">
                        {payment.paymentMode}
                    </span>

                    {payment.school_remark && (
                        <span
                            className="mt-1 max-w-[150px] truncate text-[10px] text-slate-400"
                            title={
                                payment.school_remark
                            }
                        >
                            {
                                payment.school_remark
                            }
                        </span>
                    )}
                </div>
            </td>

            <td className="p-4">
                <span
                    className={`rounded px-2 py-1 text-[10px] font-bold uppercase ${
                        payment.status ===
                        "Verified"
                            ? "bg-emerald-100 text-emerald-700"
                            : payment.status ===
                              "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700"
                    }`}
                >
                    {payment.status}
                </span>
            </td>

            <td className="p-4 font-medium text-slate-600">
                {payment.validUntil
                    ? new Date(
                          payment.validUntil
                      ).toLocaleDateString()
                    : "-"}
            </td>

            <td className="p-4">
                {payment.receiptUrl ? (
                    <a
                        href={`http://localhost:5000${payment.receiptUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded bg-indigo-50 px-2 py-1 font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                        View Receipt
                    </a>
                ) : (
                    "-"
                )}
            </td>

            <td className="p-4 text-right">
                {payment.status ===
                "Pending" ? (
                    <button
                        onClick={() =>
                            onVerify(payment)
                        }
                        className="rounded-lg bg-indigo-600 px-4 py-1.5 font-bold text-white shadow-sm transition-colors hover:bg-indigo-700"
                    >
                        Verify
                    </button>
                ) : (
                    <button
                        onClick={() =>
                            onEdit(payment)
                        }
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-200"
                    >
                        Edit
                    </button>
                )}
            </td>
        </tr>
    );
};

export default PaymentRow;