import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hoverEffect = false, noPadding = false }) => {
    const baseClasses = `bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl relative overflow-hidden ${noPadding ? '' : 'p-6'}`;
    const hoverClasses = hoverEffect ? 'hover:border-gray-700 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500' : '';

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${baseClasses} ${hoverClasses} ${className}`}
        >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-600/50 to-transparent"></div>
            {children}
        </motion.div>
    );
};

export default Card;
