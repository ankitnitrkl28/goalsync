import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const StatCardV2 = ({ title, value, icon, loading, trend, suffix = '', prefix = '', color = 'blue' }) => {
    const colorMap = {
        blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/30 text-blue-400',
        green: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 text-emerald-400',
        purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/30 text-purple-400',
        orange: 'from-orange-500/20 to-orange-600/5 border-orange-500/30 text-orange-400',
        rose: 'from-rose-500/20 to-rose-600/5 border-rose-500/30 text-rose-400',
    };

    const activeColor = colorMap[color] || colorMap.blue;

    return (
        <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            className={`relative overflow-hidden p-6 rounded-2xl border bg-gradient-to-br ${activeColor} backdrop-blur-xl group shadow-lg transition-all duration-300`}
        >
            {/* Glow effect */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20 bg-current transition-opacity duration-500 group-hover:opacity-40`}></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-gray-900/50 rounded-xl border border-white/5 backdrop-blur-md">
                    {icon}
                </div>
                {trend !== undefined && (
                    <div className={`flex items-center gap-1 text-sm font-semibold ${trend > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                    </div>
                )}
            </div>

            <div className="relative z-10">
                <h3 className="text-gray-400 text-sm font-medium tracking-wide mb-1 uppercase">{title}</h3>
                {loading ? (
                    <div className="h-10 w-24 bg-gray-800/80 rounded animate-pulse"></div>
                ) : (
                    <div className="text-4xl font-extrabold text-white tracking-tight flex items-baseline">
                        {prefix && <span className="text-2xl text-gray-400 mr-1">{prefix}</span>}
                        {typeof value === 'number' ? (
                            value.toLocaleString()
                        ) : (
                            value
                        )}
                        {suffix && <span className="text-2xl text-gray-400 ml-1">{suffix}</span>}
                    </div>
                )}
            </div>
            
            {/* Sparkline decoration at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-500"></div>
        </motion.div>
    );
};

export default StatCardV2;
