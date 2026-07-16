import { useState } from "react";

import SchoolTable from "../components/SchoolManagement/SchoolTable";
import SchoolForm from "../components/SchoolManagement/SchoolForm";
import PageHeader from "../components/common/PageHeader";

import { School, Plus } from "lucide-react";

import useSchools from "../hooks/useSchools";

const SchoolManagement = () => {
    const {
        schools,
        loading,
        error,
        createSchool,
        updateSchool,
        deleteSchool,
    } = useSchools();

    const [open, setOpen] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState(null);

    const handleCreate = () => {
        setSelectedSchool(null);
        setOpen(true);
    };

    const handleSubmit = async (data) => {
        if (selectedSchool) {
            await updateSchool(selectedSchool.id, data);
        } else {
            await createSchool(data);
        }

        setOpen(false);
        setSelectedSchool(null);
    };

    const handleEdit = (school) => {
        setSelectedSchool(school);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedSchool(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <PageHeader
                    icon={School}
                    title="School Management"
                    description="Manage enrolled schools, administrators, subscriptions, and access from one place."
                />

                <button
                    type="button"
                    onClick={handleCreate}
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-indigo-700"
                >
                    <Plus size={18} />
                    Enroll New School
                </button>
            </div>

            <SchoolTable
                schools={schools}
                loading={loading}
                error={error}
                onEdit={handleEdit}
                onDelete={deleteSchool}
            />

            <SchoolForm
                open={open}
                onClose={handleClose}
                mode={selectedSchool ? "edit" : "create"}
                initialData={selectedSchool}
                onSubmit={(data) => {
                    handleSubmit(data),
                    console.log(selectedSchool)
                }}
            />
        </div>
    );
};

export default SchoolManagement;