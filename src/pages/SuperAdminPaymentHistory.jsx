// src/pages/SuperAdmin/SuperAdminPaymentHistory.jsx

import React, { useState } from "react";
import { ShieldAlert } from "lucide-react";

import { useSchoolData } from "../hooks/useSchoolData";
import { useSubscriptionPayments } from "../hooks/usePayments";

import PaymentTable from "../components/Payments/PaymentTable";
import PaymentVerificationModal from "../components/Payments/PaymentVerificationModal";

const SuperAdminPaymentHistory = () => {
    const {
        school,
        initializing,
        error,
    } = useSchoolData();

    const {
        payments,
        loading,
        processing,
        refresh,
        verifyPayment,
    } = useSubscriptionPayments(
        school?.id
    );

    const [
        selectedPayment,
        setSelectedPayment,
    ] = useState(null);

    const [
        verifyForm,
        setVerifyForm,
    ] = useState({
        status: "Verified",
        validUntil: "",
        remark: "",
    });

    const handleVerify = (
        payment
    ) => {
        setVerifyForm({
            status: "Verified",
            validUntil: "",
            remark: "",
        });

        setSelectedPayment(payment);
    };

    const handleEdit = (
        payment
    ) => {
        setVerifyForm({
            status: payment.status,
            validUntil: payment.validUntil
                ? new Date(
                      payment.validUntil
                  )
                      .toISOString()
                      .split("T")[0]
                : "",
            remark:
                payment.remark ||
                "",
        });

        setSelectedPayment(payment);
    };

    const handleSubmit =
        async () => {
            if (!selectedPayment)
                return;

            try {
                await verifyPayment(
                    selectedPayment.id,
                    {
                        status:
                            verifyForm.status,
                        validUntil:
                            verifyForm.status ===
                            "Verified"
                                ? verifyForm.validUntil
                                : null,
                        remark:
                            verifyForm.remark,
                    }
                );

                alert(
                    "Payment updated successfully!"
                );

                setSelectedPayment(
                    null
                );

                refresh();
            } catch {
                alert(
                    "Failed to verify payment."
                );
            }
        };

    if (
        initializing ||
        loading
    ) {
        return (
            <div className="animate-pulse p-8 text-center text-xs font-bold text-slate-500">
                Loading payment history...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-64 flex-col items-center justify-center text-slate-500">
                <ShieldAlert
                    size={48}
                    className="mb-4 opacity-50"
                />

                <p>{error}</p>
            </div>
        );
    }

    if (!school) {
        return (
            <div className="flex h-64 flex-col items-center justify-center text-slate-500">
                <ShieldAlert
                    size={48}
                    className="mb-4 opacity-50"
                />

                <p>
                    No school found
                    in the system.
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl">
            <PaymentTable
                payments={
                    payments
                }
                onVerify={
                    handleVerify
                }
                onEdit={
                    handleEdit
                }
            />

            <PaymentVerificationModal
                payment={
                    selectedPayment
                }
                form={
                    verifyForm
                }
                setForm={
                    setVerifyForm
                }
                processing={
                    processing
                }
                onClose={() =>
                    setSelectedPayment(
                        null
                    )
                }
                onSubmit={
                    handleSubmit
                }
            />
        </div>
    );
};

export default SuperAdminPaymentHistory;