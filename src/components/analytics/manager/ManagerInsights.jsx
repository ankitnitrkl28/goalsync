import React from 'react';
import { ShieldAlert, TrendingUp, Users, BrainCircuit } from 'lucide-react';

const ManagerInsights = () => {
    return (
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl h-full flex flex-col relative overflow-hidden group">
            {/* Holographic background pulse */}
            <div className="absolute -left-32 -bottom-32 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/15 transition-all duration-1000"></div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-inner">
                    <BrainCircuit className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">AI Leadership Insights</h3>
            </div>

            <div className="space-y-4 flex-1 relative z-10">
                {/* Burnout Risk Alert */}
                <div className="bg-gradient-to-r from-rose-500/10 to-transparent p-4 rounded-xl border border-rose-500/20 hover:border-rose-500/40 transition-colors cursor-default">
                    <div className="flex items-center gap-3 mb-2">
                        <ShieldAlert className="w-4 h-4 text-rose-400" />
                        <h4 className="text-sm font-bold text-white">Burnout Risk Detected</h4>
                    </div>
                    <p className="text-xs text-gray-300 ml-7 leading-relaxed">
                        <span className="text-rose-300 font-semibold">Bob Smith</span> has been significantly overallocated this sprint. Consider redistributing 2 tasks to Charlie.
                    </p>
                </div>

                {/* Team Velocity Insight */}
                <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-4 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-colors cursor-default">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-sm font-bold text-white">Velocity Increase</h4>
                    </div>
                    <p className="text-xs text-gray-300 ml-7 leading-relaxed">
                        Team completion speed is up <span className="text-emerald-300 font-semibold">18%</span> since optimizing the check-in reviews.
                    </p>
                </div>

                {/* Culture Insight */}
                <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-4 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-default">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <h4 className="text-sm font-bold text-white">Engagement Drop</h4>
                    </div>
                    <p className="text-xs text-gray-300 ml-7 leading-relaxed">
                        Fewer mid-quarter updates submitted this month. A quick 1-on-1 aligns priorities.
                    </p>
                </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-800/80 relative z-10">
                <button className="w-full py-3 bg-white hover:bg-gray-200 text-gray-900 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all flex items-center justify-center gap-2">
                    <BrainCircuit className="w-4 h-4" /> Run Deep Diagnostic
                </button>
            </div>
        </div>
    );
};

export default ManagerInsights;
