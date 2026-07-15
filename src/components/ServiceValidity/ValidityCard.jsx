import ValidityUpdateForm from './ValidityUpdateForm';

const ValidityCard = ({
    settings,
    showUpdateForm,
    setShowUpdateForm,
    validityForm,
    setValidityForm,
    processing,
    onSave,
}) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-800">
                        Current Validity
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        The current validity of the school services. Updating it
                        manually overrides the latest payment date.
                    </p>
                </div>

                <button
                    onClick={() => setShowUpdateForm(!showUpdateForm)}
                    className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-200"
                >
                    {showUpdateForm ? 'Cancel' : 'Update Validity'}
                </button>
            </div>

            {showUpdateForm ? (
                <ValidityUpdateForm
                    validityForm={validityForm}
                    setValidityForm={setValidityForm}
                    processing={processing}
                    onSave={onSave}
                />
            ) : (
                <div className="rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-600">
                            Paid Upto
                        </span>

                        <span className="text-2xl font-black text-indigo-600">
                            {settings?.validUntil
                                ? new Date(settings.validUntil).toLocaleDateString(
                                      'en-IN',
                                      {
                                          day: 'numeric',
                                          month: 'short',
                                          year: 'numeric',
                                      }
                                  )
                                : 'No Data'}
                        </span>
                    </div>

                    {settings?.validityRemark && (
                        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                            <span className="font-semibold">Remark:</span>{' '}
                            {settings.validityRemark}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ValidityCard;