import { Building2 } from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import BankDetailsForm from "../components/BankDetails/BankDetailsForm";

import { useBankDetails } from "../hooks/useBankDetails";

const SuperAdminBankDetails = () => {
    const {
        loading,
        processing,
        bankForm,
        setBankForm,
        uploadQrCode,
        saveBankDetails,
    } = useBankDetails();

    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <PageHeader
                icon={Building2}
                title="Bank Details & QR"
                description="Configure payment modes for the School Admin."
            />

            {loading ? (
                <div className="p-8 text-center text-xs font-bold text-slate-500 animate-pulse">
                    Loading bank details...
                </div>
            ) : (
                <BankDetailsForm
                    bankForm={bankForm}
                    setBankForm={setBankForm}
                    processing={processing}
                    onUpload={uploadQrCode}
                    onSave={saveBankDetails}
                />
            )}
        </div>
    );
};

export default SuperAdminBankDetails;