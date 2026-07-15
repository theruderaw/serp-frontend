import { Settings } from 'lucide-react';

import { useSchoolData } from '../hooks/useSchoolData';
import { useGlobalStats } from '../hooks/useGlobalStats';
import { useSubscriptionPlan } from '../hooks/useSubscriptionPlan';

import BillingModeSelector from '../components/SubscriptionPlan/BillingModeSelector';
import CumulativePlanForm from '../components/SubscriptionPlan/CumulativePlanForm';
import BillingAdjustmentForm from '../components/SubscriptionPlan/BillingAdjustmentForm';
import BillingSummary from '../components/SubscriptionPlan/BillingSummary';
import SaveButton from '../components/SubscriptionPlan/SaveButton';
import PerStudentPlanForm from '../components/SubscriptionPlan/PerStudentPlanForm';
import PageHeader from '../components/common/PageHeader';


const SubscriptionPlan = () => {

    const { school } = useSchoolData();
    const { stats } = useGlobalStats();

    const totalStudents = Number(
        stats?.totalstudents ?? 0
    );


    const {
        billingMode,
        setBillingMode,

        cumulativeMonthlyAmount,
        cumulativeYearlyAmount,

        perStudentMonthlyPrice,
        perStudentYearlyPrice,

        discountAmount,
        discountText,
        gstPercentage,

        setDiscountAmount,
        setDiscountText,
        setGstPercentage,

        handleCumulativeMonthlyChange,
        handleCumulativeYearlyChange,

        handlePerStudentMonthlyChange,
        handlePerStudentYearlyChange,

        netRevenue,

        saving,

        saveSettings

    } = useSubscriptionPlan(
        school?.id
    );



    return (
        <div className="space-y-6">

            <PageHeader
                icon={Settings}
                title="Subscription Plan Settings"
                description="Configure how the school is billed."
            />


            <div
                className="
                    bg-white rounded-2xl
                    shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                    border border-slate-100
                    p-8 space-y-8
                "
            >

                <BillingModeSelector
                    billingMode={billingMode}
                    onChange={setBillingMode}
                />


                {
                    billingMode === "Cumulative"

                        ?

                        <CumulativePlanForm
                            monthlyAmount={
                                cumulativeMonthlyAmount
                            }

                            yearlyAmount={
                                cumulativeYearlyAmount
                            }

                            onChangeMonthly={
                                handleCumulativeMonthlyChange
                            }

                            onChangeYearly={
                                handleCumulativeYearlyChange
                            }
                        />

                        :

                        <PerStudentPlanForm
                            monthlyPrice={
                                perStudentMonthlyPrice
                            }

                            yearlyPrice={
                                perStudentYearlyPrice
                            }

                            onChangeMonthly={
                                handlePerStudentMonthlyChange
                            }

                            onChangeYearly={
                                handlePerStudentYearlyChange
                            }
                        />

                }



                <BillingAdjustmentForm
                    discountAmount={discountAmount}
                    discountText={discountText}
                    gstPercentage={gstPercentage}

                    onChangeDiscountAmount={
                        setDiscountAmount
                    }

                    onChangeDiscountText={
                        setDiscountText
                    }

                    onChangeGstPercentage={
                        setGstPercentage
                    }
                />



                <div
                    className="
                        flex justify-between
                        items-end pt-2
                    "
                >

                    <BillingSummary
                        revenue={
                            billingMode === "Cumulative"
                                ? netRevenue
                                : netRevenue * totalStudents
                        }

                        discountAmount={
                            discountAmount
                        }

                        gstPercentage={
                            gstPercentage
                        }
                    />


                    <SaveButton
                        onClick={saveSettings}
                        saving={saving}
                    />

                </div>

            </div>

        </div>
    );
};


export default SubscriptionPlan;