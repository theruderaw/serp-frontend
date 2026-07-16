import {
    useState,
    useEffect,
    useCallback,
} from "react";

import {
    getSubscriptionPayments,
    verifySubscriptionPayment,
    uploadPaymentReceipt,
} from "../api/subscription_plan.api";

export const useSubscriptionPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    const fetchPayments = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getSubscriptionPayments();
            setPayments(data);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    const verifyPayment = useCallback(
        async (paymentId, payload) => {
            setProcessing(true);

            try {
                const data = await verifySubscriptionPayment(
                    paymentId,
                    payload
                );

                await fetchPayments();

                return data;
            } catch (err) {
                console.error(err);
                setError(err);
                throw err;
            } finally {
                setProcessing(false);
            }
        },
        [fetchPayments]
    );

    const uploadReceipt = useCallback(
        async (file) => {
            setProcessing(true);

            try {
                return await uploadPaymentReceipt(file);
            } catch (err) {
                console.error(err);
                setError(err);
                throw err;
            } finally {
                setProcessing(false);
            }
        },
        []
    );

    return {
        payments,

        loading,
        processing,
        error,

        refresh: fetchPayments,

        verifyPayment,
        uploadReceipt,
    };
};