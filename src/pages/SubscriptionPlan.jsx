import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { useGlobalStats } from '../hooks/useGlobalStats';

import BillingModeSelector from '../components/SubscriptionPlan/BillingModeSelector';
import CumulativePlanForm from '../components/SubscriptionPlan/CumulativePlanForm';
import BillingAdjustmentForm from '../components/SubscriptionPlan/BillingAdjustmentForm';
import BillingSummary from '../components/SubscriptionPlan/BillingSummary';
import SaveButton from '../components/SubscriptionPlan/SaveButton';
import PerStudentPlanForm from '../components/SubscriptionPlan/PerStudentPlanForm';

const SubscriptionPlan = () => {

    const { stats } = useGlobalStats();

    const totalStudents = Number(stats?.totalstudents ?? 0);

    const [billingMode, setBillingMode] = useState('Cumulative');

    const [monthlyAmount, setMonthlyAmount] = useState('');
    const [yearlyAmount, setYearlyAmount] = useState('');

    const [discountAmount, setDiscountAmount] = useState('');
    const [discountText, setDiscountText] = useState('');
    const [gstPercentage, setGstPercentage] = useState('');

    const [saving, setSaving] = useState(false);



    const handleMonthlyChange = (value) => {
        setMonthlyAmount(value);
        setYearlyAmount(value ? Number(value) * 12 : '');
    };


    const handleYearlyChange = (value) => {
        setYearlyAmount(value);
        setMonthlyAmount(value ? Number(value) / 12 : '');
    };


    const netRevenue = Number(yearlyAmount) || 0;



    const handleSave = async () => {

        const payload = {
            billingMode,

            monthlyAmount: Number(monthlyAmount) || 0,
            yearlyAmount: Number(yearlyAmount) || 0,

            discountAmount: Number(discountAmount) || 0,
            discountText,

            gstPercentage: Number(gstPercentage) || 0,
        };


        setSaving(true);

        try {
            console.log(payload);
            // API call here
        } finally {
            setSaving(false);
        }
    };



    return (
        <div className="space-y-6">

            <div className="flex items-center gap-3">

                <div className="
                    w-11 h-11 rounded-xl
                    bg-indigo-50 text-indigo-600
                    flex items-center justify-center
                ">
                    <Settings size={20}/>
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Subscription Plan Settings
                    </h1>

                    <p className="text-slate-400 text-sm">
                        Configure how the school is billed.
                    </p>
                </div>

            </div>



            <div className="
                bg-white rounded-2xl
                shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                border border-slate-100
                p-8 space-y-8
            ">


                <BillingModeSelector
                    billingMode={billingMode}
                    onChange={setBillingMode}
                />



                {billingMode === 'Cumulative' ? (
                    <CumulativePlanForm
                        monthlyAmount={monthlyAmount}
                        yearlyAmount={yearlyAmount}
                        onChangeMonthly={handleMonthlyChange}
                        onChangeYearly={handleYearlyChange}
                    />
                ) : <PerStudentPlanForm
                    monthlyPrice={monthlyAmount}
                    yearlyPrice={yearlyAmount}
                    onChangeMonthly={handleMonthlyChange}
                    onChangeYearly={handleYearlyChange}
                />}



                <BillingAdjustmentForm
                    discountAmount={discountAmount}
                    discountText={discountText}
                    gstPercentage={gstPercentage}

                    onChangeDiscountAmount={setDiscountAmount}
                    onChangeDiscountText={setDiscountText}
                    onChangeGstPercentage={setGstPercentage}
                />



                <div className="flex justify-between items-end pt-2">

                    <BillingSummary
                        revenue={netRevenue}
                        discountAmount={discountAmount}
                        gstPercentage={gstPercentage}
                    />


                    <SaveButton
                        onClick={handleSave}
                        saving={saving}
                    />

                </div>


            </div>

        </div>
    );
};

export default SubscriptionPlan;