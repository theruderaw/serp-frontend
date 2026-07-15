const QRPreview = ({ qrCodeUrl }) => {
    if (!qrCodeUrl) return null;

    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-sm font-semibold text-slate-600">
                QR Preview
            </p>

            <img
                src={`http://localhost:5000${qrCodeUrl}`}
                alt="Payment QR"
                className="h-48 rounded-lg object-contain"
            />
        </div>
    );
};

export default QRPreview;