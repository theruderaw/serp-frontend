import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getSubscriptionSettings,
    updateSubscriptionSettings,
} from "../api/subscription_plan.api";

export const useSubscriptionPlan = () => {
    const [billingMode, setBillingMode] =
        useState("Cumulative");

    const [
        cumulativeMonthlyAmount,
        setCumulativeMonthlyAmount,
    ] = useState("");

    const [
        cumulativeYearlyAmount,
        setCumulativeYearlyAmount,
    ] = useState("");

    const [
        perStudentMonthlyPrice,
        setPerStudentMonthlyPrice,
    ] = useState("");

    const [
        perStudentYearlyPrice,
        setPerStudentYearlyPrice,
    ] = useState("");

    const [
        discountAmount,
        setDiscountAmount,
    ] = useState("");

    const [
        discountText,
        setDiscountText,
    ] = useState("");

    const [
        gstPercentage,
        setGstPercentage,
    ] = useState("");

    const [loading, setLoading] =
        useState(false);

    const [saving, setSaving] =
        useState(false);

    const loadSettings = useCallback(
        async () => {
            try {
                setLoading(true);

                const data =
                    await getSubscriptionSettings();

                setBillingMode(
                    data.billingMode ||
                    "Cumulative"
                );

                setCumulativeMonthlyAmount(
                    data.monthlyAmount ?? ""
                );

                setCumulativeYearlyAmount(
                    data.yearlyAmount ?? ""
                );

                setPerStudentMonthlyPrice(
                    data.perStudentPrice ?? ""
                );

                setPerStudentYearlyPrice(
                    data.yearlyPerStudentPrice ?? ""
                );

                setDiscountAmount(
                    data.discountAmount ?? ""
                );

                setDiscountText(
                    data.discountText ?? ""
                );

                setGstPercentage(
                    data.gstPercentage ?? ""
                );
            } catch (err) {
                console.error(
                    "Failed to load settings",
                    err
                );
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        loadSettings();
    }, [loadSettings]);

    const handleCumulativeMonthlyChange = (
        value
    ) => {
        setCumulativeMonthlyAmount(value);

        setCumulativeYearlyAmount(
            value
                ? String(Number(value) * 12)
                : ""
        );
    };

    const handleCumulativeYearlyChange = (
        value
    ) => {
        setCumulativeYearlyAmount(value);

        setCumulativeMonthlyAmount(
            value
                ? String(Number(value) / 12)
                : ""
        );
    };

    const handlePerStudentMonthlyChange = (
        value
    ) => {
        setPerStudentMonthlyPrice(value);

        setPerStudentYearlyPrice(
            value
                ? String(Number(value) * 12)
                : ""
        );
    };

    const handlePerStudentYearlyChange = (
        value
    ) => {
        setPerStudentYearlyPrice(value);

        setPerStudentMonthlyPrice(
            value
                ? String(Number(value) / 12)
                : ""
        );
    };

    const saveSettings = async () => {
        try {
            setSaving(true);

            await updateSubscriptionSettings({
                billingMode,

                // Per Student
                perStudentPrice:
                    billingMode === "Per Student"
                        ? Number(
                              perStudentMonthlyPrice || 0
                          )
                        : null,

                yearlyPerStudentPrice:
                    billingMode === "Per Student"
                        ? Number(
                              perStudentYearlyPrice || 0
                          )
                        : null,

                // Cumulative
                monthlyAmount:
                    billingMode === "Cumulative"
                        ? Number(
                              cumulativeMonthlyAmount || 0
                          )
                        : null,

                yearlyAmount:
                    billingMode === "Cumulative"
                        ? Number(
                              cumulativeYearlyAmount || 0
                          )
                        : null,

                discountAmount:
                    Number(
                        discountAmount || 0
                    ),

                discountText:
                    discountText || null,

                gstPercentage:
                    Number(
                        gstPercentage || 0
                    ),

                // Reset unrelated fields
                validUntil: null,
                validityRemark: null,

                upiId: null,
                bankName: null,
                bankAccountNo: null,
                bankIfsc: null,
                bankBranch: null,
                bankDetails: null,
                qrCodeUrl: null,
            });

            if (
                billingMode === "Per Student"
            ) {
                setCumulativeMonthlyAmount("");
                setCumulativeYearlyAmount("");
            } else {
                setPerStudentMonthlyPrice("");
                setPerStudentYearlyPrice("");
            }
        } catch (err) {
            console.error(
                "Failed to save settings",
                err
            );

            throw err;
        } finally {
            setSaving(false);
        }
    };

    return {
        // Billing Mode
        billingMode,
        setBillingMode,

        // Cumulative
        cumulativeMonthlyAmount,
        setCumulativeMonthlyAmount,

        cumulativeYearlyAmount,
        setCumulativeYearlyAmount,

        // Per Student
        perStudentMonthlyPrice,
        setPerStudentMonthlyPrice,

        perStudentYearlyPrice,
        setPerStudentYearlyPrice,

        // Discount/GST
        discountAmount,
        setDiscountAmount,

        discountText,
        setDiscountText,

        gstPercentage,
        setGstPercentage,

        // Change handlers
        handleCumulativeMonthlyChange,
        handleCumulativeYearlyChange,

        handlePerStudentMonthlyChange,
        handlePerStudentYearlyChange,

        // Calculated
        netRevenue:
            billingMode === "Cumulative"
                ? Number(
                      cumulativeYearlyAmount
                  ) || 0
                : Number(
                      perStudentYearlyPrice
                  ) || 0,

        // State
        loading,
        saving,

        // Actions
        saveSettings,
        reload: loadSettings,
    };
}