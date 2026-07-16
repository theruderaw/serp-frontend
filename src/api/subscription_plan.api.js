import { SCHOOL_ID } from "../config/school";
import api from "./axios";

export const getSubscriptionSettings = async () => {
    const { data } = await api.get(
        `/subscriptions/settings/${SCHOOL_ID}`
    );

    return data;
};

export const updateSubscriptionSettings = async (
    settings
) => {
    const payload = {
        billingMode: settings.billingMode,

        perStudentPrice: Number(
            settings.perStudentPrice ?? 0
        ),

        yearlyPerStudentPrice: Number(
            settings.yearlyPerStudentPrice ?? 0
        ),

        monthlyAmount: Number(
            settings.monthlyAmount ?? 0
        ),

        yearlyAmount: Number(
            settings.yearlyAmount ?? 0
        ),

        discountAmount: Number(
            settings.discountAmount ?? 0
        ),

        discountText:
            settings.discountText ?? null,

        gstPercentage: Number(
            settings.gstPercentage ?? 0
        ),

        validUntil:
            settings.validUntil || "",

        validityRemark:
            settings.validityRemark ?? null,

        upiId:
            settings.upiId ?? null,

        bankName:
            settings.bankName ?? null,

        bankAccountNo:
            settings.bankAccountNo ?? null,

        bankIfsc:
            settings.bankIfsc ?? null,

        bankBranch:
            settings.bankBranch ?? null,

        bankDetails:
            settings.bankDetails ?? null,

        qrCodeUrl:
            settings.qrCodeUrl ?? null,
    };

    const { data } = await api.put(
        `/subscriptions/settings/${SCHOOL_ID}`,
        payload
    );

    return data;
};

/**
 * Upload QR code image.
 *
 * @param {File} file
 */
export const uploadQRCode = async (file) => {
    const formData = new FormData();

    formData.append(
        "file",
        file
    );

    const { data } = await api.post(
        "/uploads",
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

    return data.url;
};

/**
 * Upload payment receipt.
 *
 * @param {File} file
 */
export const uploadPaymentReceipt = async (
    file
) => {
    const formData = new FormData();

    formData.append(
        "file",
        file
    );

    const { data } = await api.post(
        "/uploads",
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

    return data.url;
};

export const getSubscriptionPayments =
    async () => {
        const { data } =
            await api.get(
                `/subscriptions/payments/${SCHOOL_ID}`
            );

        return data;
    };

/**
 * Verify / reject a payment.
 *
 * @param {string} paymentId
 * @param {Object} payload
 */
export const verifySubscriptionPayment =
    async (
        paymentId,
        payload
    ) => {
        const { data } =
            await api.put(
                `/subscriptions/payments/${paymentId}/verify`,
                payload
            );

        return data;
    };