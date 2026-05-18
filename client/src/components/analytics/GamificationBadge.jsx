import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Zap } from 'lucide-react';
import CountUp from 'react-countup';

const GamificationBadge = ({ xp = 2450, level = 12, streak = 14 }) => {
    // XP logic: Next level at 3000 XP
    const nextLevelXP = 3000;
    const progress = (xp / nextLevelXP) * 100;

    return (
        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/20 border border-indigo-500/30 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden h-full flex flex-col justify-center">
            <div className="absolute -right-20 -top-20 w-48 h-48 border-[20px] border-purple-500/10 rounded-full blur-sm"></div>
            
            <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                    <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-900 border-4 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10 relative"
                    >
                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-400">
                            L{level}
                        </span>
                    </motion.div>
                    <svg className="absolute top-0 left-0 w-20 h-20 -rotate-90 z-20">
                        <circle cx="40" cy="40" r="38" fill="none" stroke="currentColor" strokeWidth="4" className="text-gray-800" />
                        <motion.circle 
                            initial={{ strokeDasharray: '0 250' }}
                            animate={{ strokeDasharray: `${(progress / 100) * 238} 250` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            cx="40" cy="40" r="38" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="4" 
                            strokeLinecap="round"
                            className="text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" 
                        />
                    </svg>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        Goal Master <Trophy className="w-6 h-6 text-yellow-400" />
                    </h3>
                    <div className="text-indigo-300 font-medium">
                        {xp.toLocaleString()} / {nextLevelXP} XP
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="bg-gray-900/50 rounded-xl p-3 flex items-center gap-3 border border-orange-500/20 shadow-inner group transition-all hover:bg-gray-800/80">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex flex-col items-center justify-center text-orange-400 relative overflow-hidden group-hover:scale-110 transition-transform">
                        <Flame className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Streak</p>
                        <p className="text-lg font-bold text-white tracking-tight">{streak} Days</p>
                    </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-xl p-3 flex items-center gap-3 border border-emerald-500/20 shadow-inner group transition-all hover:bg-gray-800/80">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex flex-col items-center justify-center text-emerald-400 relative overflow-hidden group-hover:scale-110 transition-transform">
                        <Zap className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Top Skill</p>
                        <p className="text-sm font-bold text-white tracking-tight">Consistency</p>
                    </div>
                </div>
            </div>
            
            {/* Progress bar info underneath */}
            <div className="mt-6 pt-4 border-t border-indigo-500/20">
                <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
                    <span>Rank: {level > 10 ? 'Elite' : 'Novice'}</span>
                    <span>{nextLevelXP - xp} XP to Level {level + 1}</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-1.5 border border-indigo-500/20">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.5 }}
                        className="bg-indigo-500 h-1.5 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                    ></motion.div>
                </div>
            </div>
        </div>
    );
};

export default GamificationBadge;
