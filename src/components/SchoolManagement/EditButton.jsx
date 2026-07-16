import { Edit } from "lucide-react";

const EditButton = ({ onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-slate-200"
        >
            <Edit size={16} />
        </button>
    );
};

export default EditButton;