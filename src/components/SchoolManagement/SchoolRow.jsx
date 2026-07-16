import { Phone, Calendar } from "lucide-react";

import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const SchoolRow = ({
    school,
    index,
    onEdit,
    onDelete,
}) => {
    return (
        <tr className="hover:bg-slate-50/50">
            <td className="p-4 font-medium text-slate-600">
                {index + 1}
            </td>

            <td className="p-4">
                <div className="flex items-center gap-3">
                    <img
                        src={school.logo}
                        alt={school.name}
                        className="h-12 w-12 rounded-lg border border-slate-200 object-cover"
                    />

                    <div>
                        <h4 className="font-bold text-slate-800">
                            {school.name}
                        </h4>
                    </div>
                </div>
            </td>

            <td className="p-4">
                <div className="text-sm text-slate-700">
                    {school.address}
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <Phone size={14} />
                    {school.phone}
                </div>
            </td>

            <td className="p-4">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                    <div className="text-slate-600">
                        <span className="font-bold text-slate-700">
                            USER:
                        </span>{" "}
                        {school.username}
                    </div>

                    <div className="mt-1 text-slate-600">
                        <span className="font-bold text-slate-700">
                            PASS:
                        </span>{" "}
                        {school.password}
                    </div>
                </div>
            </td>

            <td className="p-4">
                <div className="flex items-center gap-2 font-medium text-slate-600">
                    <Calendar size={15} />
                    {new Date(school.expires_at).toDateString()}
                </div>
            </td>

            <td className="p-4">
                <div className="flex justify-end gap-2">
                    <EditButton onClick={() => onEdit(school)} />
                    <DeleteButton onClick={() => onDelete(school)} />
                </div>
            </td>
        </tr>
    );
};

export default SchoolRow;