const PageHeader = ({
    icon: Icon,
    title,
    description,
}) => {
    return (
        <div className="flex items-center gap-3">
            {Icon && (
                <div className="
                    w-11 h-11 rounded-xl
                    bg-indigo-50 text-indigo-600
                    flex items-center justify-center
                ">
                    <Icon size={40} />
                </div>
            )}

            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    {title}
                </h1>

                <p className="text-slate-400 text-sm">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default PageHeader;