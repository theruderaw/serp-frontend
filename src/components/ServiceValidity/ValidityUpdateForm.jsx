const ValidityUpdateForm = ({
    validityForm,
    setValidityForm,
    processing,
    onSave,
}) => {
    return (
        <div className="space-y-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Valid Until
                </label>

                <input
                    type="date"
                    value={validityForm.validUntil}
                    onChange={(e) =>
                        setValidityForm({
                            ...validityForm,
                            validUntil: e.target.value,
                        })
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500"
                />
            </div>

            <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Remark
                </label>

                <input
                    type="text"
                    value={validityForm.validityRemark}
                    onChange={(e) =>
                        setValidityForm({
                            ...validityForm,
                            validityRemark: e.target.value,
                        })
                    }
                    placeholder="Extended manually for testing"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500"
                />
            </div>

            <div className="flex justify-end">
                <button
                    onClick={onSave}
                    disabled={processing || !validityForm.validUntil}
                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default ValidityUpdateForm;