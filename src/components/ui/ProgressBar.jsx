import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ value, max = 100, color = 'blue', showLabel = true, height = 'h-2' }) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const colorClasses = {
        blue: 'from-blue-500 to-cyan-400 shadow-blue-500/50',
        purple: 'from-purple-500 to-pink-500 shadow-purple-500/50',
        green: 'from-green-500 to-emerald-400 shadow-green-500/50',
        red: 'from-red-500 to-rose-400 shadow-red-500/50',
        warning: 'from-yellow-400 to-orange-500 shadow-orange-500/50'
    };
    
    const activeColor = colorClasses[color] || colorClasses.blue;

    return (
        <div className="w-full">
            {showLabel && (
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-300">Progress</span>
                    <span className="text-sm font-bold text-white">{Math.round(percentage)}%</span>
                </div>
            )}
            <div className={`w-full bg-gray-800 rounded-full overflow-hidden ${height}`}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${activeColor} shadow-lg`}
                ></motion.div>
            </div>
        </div>
    );
};

export default ProgressBar;
