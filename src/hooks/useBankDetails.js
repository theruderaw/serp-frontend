import { useState, useEffect, useCallback } from 'react';

import { useSchoolData } from './useSchoolData';

import {
    getSubscriptionSettings,
    updateSubscriptionSettings,
    uploadQRCode
} from '../api/subscription_plan.api';

export const useBankDetails = () => {
    const { school, initializing } = useSchoolData();

    const [processing, setProcessing] = useState(false);

    const [bankForm, setBankForm] = useState({
        upiId: '',
        bankName: '',
        bankAccountNo: '',
        bankIfsc: '',
        bankBranch: '',
        qrCodeUrl: ''
    });

    const loadBankDetails = useCallback(async () => {
        if (!school) return;

        try {
            const settings = await getSubscriptionSettings(school.id);

            if (!settings) return;

            setBankForm({
                upiId: settings.upiId || '',
                bankName: settings.bankName || '',
                bankAccountNo: settings.bankAccountNo || '',
                bankIfsc: settings.bankIfsc || '',
                bankBranch: settings.bankBranch || '',
                qrCodeUrl: settings.qrCodeUrl || ''
            });
        } catch (err) {
            console.error('Failed to load bank details:', err);
        }
    }, [school]);

    useEffect(() => {
        loadBankDetails();
    }, [loadBankDetails]);

    const uploadQrCode = async (file) => {
        try {
            const url = await uploadQRCode(file);

            setBankForm(prev => ({
                ...prev,
                qrCodeUrl: url
            }));
        } catch (err) {
            console.error('QR upload failed:', err);
            throw err;
        }
    };

    const saveBankDetails = async () => {
        if (!school) return;

        try {
            setProcessing(true);

            const currentSettings = await getSubscriptionSettings(school.id);

            await updateSubscriptionSettings(school.id, {
                ...currentSettings,
                ...bankForm
            });
        } catch (err) {
            console.error('Failed to save bank details:', err);
            throw err;
        } finally {
            setProcessing(false);
        }
    };

    return {
        loading: initializing,
        processing,

        bankForm,
        setBankForm,

        uploadQrCode,
        saveBankDetails
    };
};