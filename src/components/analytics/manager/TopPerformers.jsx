import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy } from 'lucide-react';

const TopPerformers = () => {
    const performers = [
        { id: 1, name: 'Alice Chen', avatar: 'https://i.pravatar.cc/150?u=a042', role: 'Sr. Engineer', score: 98, streak: 21, xp: 4500, badge: '🥇 Best Performer', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' },
        { id: 2, name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?u=b042', role: 'Product Manager', score: 95, streak: 18, xp: 4100, badge: '🥈 Consistent', color: 'text-gray-300', bg: 'bg-gray-400/20', border: 'border-gray-400/30' },
        { id: 3, name: 'Charlie Liu', avatar: 'https://i.pravatar.cc/150?u=c042', role: 'Designer', score: 91, streak: 12, xp: 3800, badge: '🥉 Fast Paced', color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/30' }
    ];

    return (
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl h-full flex flex-col overflow-hidden relative">
            {/* Background glowing orb */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    Top Performers
                </h3>
                <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">This Quarter</span>
            </div>

            <div className="space-y-4 flex-1 relative z-10">
                {performers.map((user, idx) => (
                    <motion.div 
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`group relative p-4 rounded-xl border ${user.border} bg-gray-900/50 hover:bg-gray-800/80 transition-all overflow-hidden`}
                    >
                        {/* Hover glow sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>

                        <div className="relative flex items-center gap-4">
                            <div className="relative">
                                <img src={user.avatar} alt={user.name} className={`w-12 h-12 rounded-full border-2 ${user.border} object-cover shadow-lg`} />
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center border border-gray-700 shadow-md">
                                    <span className="text-xs font-bold text-white">{idx + 1}</span>
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">{user.name}</h4>
                                        <span className="text-[11px] text-gray-400 uppercase tracking-wide">{user.role}</span>
                                    </div>
                                    <div className={`text-xs font-bold px-2 py-1 rounded-md shadow-sm ${user.bg} ${user.color}`}>
                                        {user.badge}
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center gap-2 flex-1">
                                        <div className="w-full bg-gray-800 rounded-full h-1.5 border border-gray-700 overflow-hidden">
                                            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${user.score}%` }}></div>
                                        </div>
                                        <span className="text-xs font-semibold text-gray-300 w-8">{user.score}%</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 border border-gray-800 px-2 py-0.5 rounded-md bg-gray-900">
                                        <Star className="w-3 h-3 text-emerald-400" /> {user.xp.toLocaleString()} XP
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-800 w-full text-center">
                <button className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                    View Complete Leaderboard →
                </button>
            </div>
        </div>
    );
};

export default TopPerformers;
