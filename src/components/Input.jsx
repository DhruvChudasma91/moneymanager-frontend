const Input = ({ 
    label, 
    type, 
    placeholder, 
    value, 
    onChange,
    required = false
}) => {
    return (
        <div className="mb-4">
            <label className="text-[13px] text-slate-800 mb-1">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">

                <input 
                className="w-full bg-transparent outline-none px-3 py-2 pr-10 border border-gray-300 rounded-md
                text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type={type} 
                value={value} 
                onChange={(e) => onChange(e)}
                placeholder={placeholder}
                required={required}
                />

            </div>
        
        </div>
    );
};

export default Input;