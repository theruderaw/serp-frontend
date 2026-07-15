import BankFields from './BankFields';
import QRCodeUploader from './QRCodeUploader';
import QRCodePreview from './QRCodePreview';
import SaveButton from './SaveButton';

const BankDetailsForm = ({
    bankForm,
    setBankForm,
    processing,
    onUpload,
    onSave
}) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">

            <BankFields
                bankForm={bankForm}
                setBankForm={setBankForm}
            />

            <div className="space-y-4">
                <QRCodeUploader
                    qrCodeUrl={bankForm.qrCodeUrl}
                    onUpload={onUpload}
                />

                <QRCodePreview
                    qrCodeUrl={bankForm.qrCodeUrl}
                />
            </div>

            <div className="flex justify-end pt-2">
                <SaveButton
                    processing={processing}
                    onClick={onSave}
                />
            </div>

        </div>
    );
};

export default BankDetailsForm;