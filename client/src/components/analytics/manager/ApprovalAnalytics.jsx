import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';

const ApprovalAnalytics = () => {
    const data = [
        { name: 'Approved', value: 85, color: '#10b981' }, // Emerald
        { name: 'Pending', value: 10, color: '#6366f1' },  // Indigo
        { name: 'Rejected', value: 5, color: '#f43f5e' }   // Rose
    ];

    return (
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl h-full flex flex-col relative overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700 pointer-events-none"></div>

            <div className="flex items-center justify-between mb-1 relative z-10">
                <h3 className="text-xl font-bold text-white">Approval Pipeline</h3>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20 shadow-inner">
                    <TrendingUp className="w-3 h-3" /> 92% SLA
                </div>
            </div>
            <p className="text-sm text-gray-400 mb-6 relative z-10">Average resolution pace: <span className="text-white font-semibold">4.2 hours</span></p>

            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 flex-1">
                <div className="w-40 h-40 relative group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%" cy="50%"
                                innerRadius={55}
                                outerRadius={75}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.75rem', color: '#fff', fontSize: '13px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                                itemStyle={{ color: '#e5e7eb', fontWeight: 'bold' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-black text-white drop-shadow-md">142</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total</span>
                    </div>
                </div>

                <div className="flex-1 space-y-3 w-full">
                    {data.map((item) => (
                        <div key={item.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/80 transition-colors border border-transparent hover:border-gray-700">
                            <div className="flex items-center gap-2.5">
                                <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.5)]" style={{ backgroundColor: item.color }}></div>
                                <span className="text-sm font-semibold text-gray-300">{item.name}</span>
                            </div>
                            <span className="text-sm font-black text-white">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ApprovalAnalytics;
