import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false, isLoading = false }) => {
    const baseStyle = "relative overflow-hidden font-medium rounded-lg px-5 py-2.5 transition-all duration-300 transform flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30",
        secondary: "bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700 hover:text-white",
        outline: "bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500/10",
        danger: "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg hover:shadow-red-500/30",
        ghost: "bg-transparent text-gray-300 hover:bg-gray-800/50 hover:text-white"
    };

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : children}
        </motion.button>
    );
};

export default Button;
