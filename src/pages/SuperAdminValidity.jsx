import { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

import { Shield } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

import {
    toggleSchoolStatus,
    resetSchoolAdminPassword,
} from '../api/schools.api';

import {
    updateSubscriptionSettings,
} from '../api/subscription_plan.api';

import { useSchoolValidity } from '../hooks/useValidity';

import ValidityCard from '../components/ServiceValidity/ValidityCard';
import ServiceControlCard from '../components/ServiceValidity/ServiceControlCard';
import AdminSecurityCard from '../components/ServiceValidity/AdminSecurityCard';

const SuperAdminValidity = () => {
    const {
        school,
        settings,
        loading,
        refresh,
    } = useSchoolValidity();

    const [processing, setProcessing] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const [validityForm, setValidityForm] = useState({
        validUntil: '',
        validityRemark: '',
    });

    useEffect(() => {
        if (!settings) return;

        setValidityForm({
            validUntil: settings.validUntil
                ? new Date(settings.validUntil)
                      .toISOString()
                      .split('T')[0]
                : '',
            validityRemark:
                settings.validityRemark || '',
        });
    }, [settings]);

    const handleToggleService = async () => {
        if (!school) return;

        const newStatus =
            school.status === 'active'
                ? 'inactive'
                : 'active';

        if (
            !window.confirm(
                `Are you sure you want to ${
                    newStatus === 'inactive'
                        ? 'DISABLE'
                        : 'ENABLE'
                } services for this school?`
            )
        ) {
            return;
        }

        setProcessing(true);

        try {
            await toggleSchoolStatus(
                school.id,
                newStatus
            );

            await refresh();
        } catch (error) {
            console.error(error);
            alert('Failed to update service status.');
        } finally {
            setProcessing(false);
        }
    };

    const handleUpdateValidity = async () => {
        if (!school || !settings) return;

        setProcessing(true);

        try {
            await updateSubscriptionSettings(
                school.id,
                {
                    ...settings,
                    validUntil: 
                        validityForm.validUntil,
                    validityRemark:
                        validityForm.validityRemark,
                }
            );

            alert(
                'Validity updated successfully.'
            );

            setShowUpdateForm(false);

            await refresh();
        } catch (error) {
            console.error(error);
            alert('Failed to update validity.');
        } finally {
            setProcessing(false);
        }
    };

    const handleResetAdminPassword = async () => {
        if (!school) return;

        if (
            !window.confirm(
                'Reset School Admin password to default?'
            )
        ) {
            return;
        }

        setProcessing(true);

        try {
            const response =
                await resetSchoolAdminPassword(
                    school.id
                );

            alert(
                `Password reset successfully. Default is: ${response.defaultPassword}`
            );
        } catch (error) {
            console.error(error);
            alert('Failed to reset password.');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 text-center text-sm font-semibold text-slate-500 animate-pulse">
                Loading validity details...
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
                    No school found in the system.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-y-auto space-y-4">
            

            <PageHeader
                icon={Shield}
                title="Service Validity & Control"
                description="Manage school access, subscription validity, and administrator security."
            />

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <ValidityCard
                    settings={settings}
                    showUpdateForm={showUpdateForm}
                    setShowUpdateForm={setShowUpdateForm}
                    validityForm={validityForm}
                    setValidityForm={setValidityForm}
                    processing={processing}
                    onSave={handleUpdateValidity}
                />

                <ServiceControlCard
                    school={school}
                    processing={processing}
                    onToggle={handleToggleService}
                />
            </div>

            <AdminSecurityCard
                processing={processing}
                onReset={handleResetAdminPassword}
            />
        </div>
    );
};

export default SuperAdminValidity;