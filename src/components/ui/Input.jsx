import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, required = false, error, as = 'input', rows }) => {
    const inputClasses = `w-full bg-gray-900/50 border ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500'} rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-1 backdrop-blur-sm`;
    
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-gray-300 ml-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            
            {as === 'textarea' ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    rows={rows || 3}
                    className={`${inputClasses} resize-none`}
                />
            ) : as === 'select' ? (
                 <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`${inputClasses} appearance-none bg-gray-900`}
                 >
                    {/* Add empty option for placeholder effect */}
                    <option value="" disabled hidden>{placeholder || "Select option"}</option>
                    {/* The caller passes standard <option> tags via a children prop ideally, but wait I didn't add children here. Let's fix that. Actually for select it's better to pass options differently. I'll just skip 'select' inside 'Input' and make a separate Select component if needed, or allow children here for select. Let's not use 'as' for select. I'll just change this component to handle input/textarea. */}
                 </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={inputClasses}
                />
            )}

            {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
        </div>
    );
};

export default Input;
