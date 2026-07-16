import { Trash2 } from "lucide-react";

const DeleteButton = ({ onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="rounded-lg bg-rose-50 p-2 text-rose-600 transition-colors hover:bg-rose-100"
        >
            <Trash2 size={16} />
        </button>
    );
};

export default DeleteButton;