import { useState, useEffect, useCallback } from 'react';

import {
    getSubscriptionSettings,
    updateSubscriptionSettings,
    uploadQRCode
} from '../api/subscription_plan.api';

export const useBankDetails = () => {
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true);

    const [bankForm, setBankForm] = useState({
        upiId: '',
        bankName: '',
        bankAccountNo: '',
        bankIfsc: '',
        bankBranch: '',
        qrCodeUrl: ''
    });

    const loadBankDetails = useCallback(async () => {
        try {
            setLoading(true);

            const settings = await getSubscriptionSettings();

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
        } finally {
            setLoading(false);
        }
    }, []);

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
        try {
            setProcessing(true);

            const currentSettings = await getSubscriptionSettings();

            await updateSubscriptionSettings({
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
        loading,
        processing,

        bankForm,
        setBankForm,

        uploadQrCode,
        saveBankDetails
    };
};