import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({ 
    label, 
    type, 
    placeholder, 
    value, 
    onChange,
    required = false
}) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type} 
                value={value} 
                onChange={(e) => onChange(e)}
                placeholder={placeholder}
                required={required}
                />
                {type === 'password' && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                        {showPassword ? (
                            <Eye size={20} className="text-purple-600" onClick={togglePasswordVisibility}/>
                        ): (
                            <EyeOff size={20} className="text-slate-400" onClick={togglePasswordVisibility}/>
                        )}
                    </span>
                )}
            </div>
        
        </div>
    );
};

export default Input;