'use client';

const CustomInput = ({ label, icon: Icon, ...props }) => {
    return (
        <div className="space-y-2 w-full">
            {label && (
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 h-4">
                    {Icon && <Icon size={14} />} {label}
                </label>
            )}
            <input
                {...props}
                className="w-full bg-zinc-900/50 border border-zinc-800 p-4 outline-none focus:border-rot-red transition-all font-medium h-[60px] text-white placeholder:text-zinc-500"
            />
        </div>
    );
};

export default CustomInput;
