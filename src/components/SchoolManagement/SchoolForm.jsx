import { useState, useEffect } from "react";
import { X } from "lucide-react";

const emptyForm = {
    name: "",
    contact_email: "",
    slug: "",
    phone: "",
    address: "",
    principal: "",
    website: "",
    established: "",
    academic_year: "",
    plan: "basic",
    logo: "",
    expires_at: "",
};

const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100";

const SchoolForm = ({
    open,
    onClose,
    onSubmit,
    initialData = null,
    mode = "create",
    principals = [],
}) => {
    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        if (!open) return;

        if (initialData) {
            // Extract just the YYYY-MM-DD portion directly from the string.
            // Deliberately NOT using `new Date(...)` here — that would parse
            // the value in local time and can shift the date by a day
            // depending on the user's timezone. expires_at is a plain SQL
            // `date` column with no time component, so we treat it as an
            // opaque "YYYY-MM-DD" string throughout instead of a Date object.
            let dateVal = "";
            if (initialData.expires_at) {
                const match = initialData.expires_at.match(/^\d{4}-\d{2}-\d{2}/);
                if (match) dateVal = match[0];
            }

            setForm({
                name: initialData.name ?? "",
                slug: initialData.slug ?? "",
                contact_email: initialData.contactEmail ?? initialData.contact_email ?? "",
                phone: initialData.phone ?? "",
                address: initialData.address ?? "",
                principal: initialData.principal ?? "",
                website: initialData.website ?? "",
                established: initialData.established ?? "",
                academic_year: initialData.academicYear ?? initialData.academic_year ?? "",
                plan: initialData.plan ?? "basic",
                logo: initialData.logo ?? "",
                expires_at: dateVal,
            });
        } else {
            setForm(emptyForm);
        }
    }, [open, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
            const updated = { ...prev, [name]: value };

            if (name === "name") {
                updated.slug = value
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "");
            }
            return updated;
        });
    };

    const handleClose = () => {
        setForm(emptyForm);
        onClose?.();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: form.name,
            slug: form.slug,
            contactEmail: form.contact_email,
            phone: form.phone || undefined,
            address: form.address || undefined,
            principal: form.principal || undefined,
            website: form.website || undefined,
            established: form.established || undefined,
            academicYear: form.academic_year || undefined,
            plan: form.plan || undefined,
            logo: form.logo || undefined,
            // Sent as-is: "YYYY-MM-DD" straight from the <input type="date">.
            // No Date()/toISOString() conversion, so no timezone-driven
            // day-shift — whatever the user picks is exactly what's stored.
            expiresAt: form.expires_at || undefined,
        };

        await onSubmit?.(payload);
        handleClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">
                            {mode === "edit" ? "Edit School" : "Enroll New School"}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            {mode === "edit"
                                ? "Update school details."
                                : "Add a new school to the ERP platform."}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                School Name
                            </label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className={inputClass}
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Contact Email
                            </label>
                            <input
                                name="contact_email"
                                type="email"
                                value={form.contact_email}
                                onChange={handleChange}
                                className={inputClass}
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Phone
                            </label>
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Principal
                            </label>
                            <select
                                name="principal"
                                value={form.principal}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                <option value="">Unassigned</option>
                                {principals.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Address
                        </label>
                        <input
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Website
                            </label>
                            <input
                                name="website"
                                value={form.website}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Plan
                            </label>
                            <select
                                name="plan"
                                value={form.plan}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                <option value="basic">Basic</option>
                                <option value="premium">Premium</option>
                                <option value="enterprise">Enterprise</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Established
                            </label>
                            <input
                                name="established"
                                type="number"
                                value={form.established}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Academic Year
                            </label>
                            <input
                                name="academic_year"
                                value={form.academic_year}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Expiration Date
                            </label>
                            <input
                                type="date"
                                name="expires_at"
                                value={form.expires_at}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-bold text-white hover:bg-indigo-700"
                        >
                            {mode === "edit" ? "Update School" : "Save School"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SchoolForm;