import { useRef } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';

const QRUploader = ({ qrCodeUrl, onUpload }) => {
    const inputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        onUpload(file);

        // Allows selecting the same file again
        e.target.value = '';
    };

    return (
        <div className="space-y-3">

            <label className="block text-sm font-semibold text-slate-600">
                QR Code
            </label>

            <div className="flex items-center gap-4">

                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="
                        inline-flex items-center gap-2
                        rounded-lg
                        bg-slate-100 hover:bg-slate-200
                        px-4 py-2.5
                        transition
                    "
                >
                    <UploadCloud size={18} />
                    Upload QR
                </button>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />

                {qrCodeUrl && (
                    <span className="
                        inline-flex items-center gap-2
                        rounded-lg
                        border border-emerald-200
                        bg-emerald-50
                        px-3 py-2
                        text-sm font-medium text-emerald-700
                    ">
                        <CheckCircle size={16} />
                        Image Uploaded
                    </span>
                )}

            </div>

        </div>
    );
};

export default QRUploader;