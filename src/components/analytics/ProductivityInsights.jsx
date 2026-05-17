import React from 'react';
import { Cpu, CalendarHeart, Target, TrendingUp } from 'lucide-react';

const ProductivityInsights = () => {
    return (
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <Cpu className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">AI Productivity Insights</h3>
            </div>

            <div className="space-y-4 flex-1">
                <div className="bg-gradient-to-r from-gray-800/40 to-gray-800/10 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <CalendarHeart className="w-4 h-4 text-rose-400" />
                        <h4 className="text-sm font-semibold text-gray-200">Most Productive Day</h4>
                    </div>
                    <p className="text-xs text-gray-400 ml-7 leading-relaxed">
                        You tend to complete the most tasks on <span className="text-rose-300 font-medium">Tuesdays</span>. Consider scheduling high-effort goals then!
                    </p>
                </div>

                <div className="bg-gradient-to-r from-gray-800/40 to-gray-800/10 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <Target className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-sm font-semibold text-gray-200">Consistency Focus</h4>
                    </div>
                    <p className="text-xs text-gray-400 ml-7 leading-relaxed">
                        Your completion speed is <span className="text-emerald-300 font-medium">15% faster</span> than last quarter. Keep up the momentum!
                    </p>
                </div>

                <div className="bg-gradient-to-r from-gray-800/40 to-gray-800/10 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        <h4 className="text-sm font-semibold text-gray-200">Suggested Action</h4>
                    </div>
                    <p className="text-xs text-gray-400 ml-7 leading-relaxed">
                        You have 2 goals nearing deadline. Check-in on <span className="text-blue-300 font-medium">"Q3 QBR Prep"</span> soon.
                    </p>
                </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-800">
                <button className="w-full py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-lg text-sm font-semibold transition-colors border border-indigo-500/20">
                    Generate Full Report
                </button>
            </div>
        </div>
    );
};

export default ProductivityInsights;
