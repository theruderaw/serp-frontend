import api from "./axios";

/**
 * Fetch subscription settings for a school.
 *
 * @param {string} schoolId
 */
export const getSubscriptionSettings = async (schoolId) => {
    const { data } = await api.get(
        `/subscriptions/settings/${schoolId}`
    );

    return data;
};

/**
 * Update subscription settings for a school.
 *
 * @param {string} schoolId
 * @param {Object} settings
 */
export const updateSubscriptionSettings = async (
    schoolId,
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
        `/subscriptions/settings/${schoolId}`,
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

/**
 * Fetch payment history.
 *
 * @param {string} schoolId
 */
export const getSubscriptionPayments =
    async (schoolId) => {
        const { data } =
            await api.get(
                `/subscriptions/payments/${schoolId}`
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