import SchoolRow from "./SchoolRow";

const SchoolTable = ({
    schools = [],
    onEdit,
    onDelete,
}) => {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                            ID
                        </th>

                        <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                            School Profile
                        </th>

                        <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                            Contact Info
                        </th>

                        <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                            Credentials
                        </th>

                        <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                            Subscription Expiry
                        </th>

                        <th className="p-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                    {schools.length ? (
                        schools.map((school, index) => (
                            <SchoolRow
                                key={school.id}
                                school={school}
                                index={index}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={6}
                                className="p-8 text-center text-sm text-slate-500"
                            >
                                No schools found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SchoolTable;