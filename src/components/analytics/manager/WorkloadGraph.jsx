import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WorkloadGraph = () => {
    // Synthetic workload distribution data
    const data = [
        { name: 'Eng', capacity: 45, overload: 15, optimal: 30 },
        { name: 'Design', capacity: 30, overload: 5, optimal: 25 },
        { name: 'Mktg', capacity: 25, overload: 2, optimal: 20 },
        { name: 'Sales', capacity: 35, overload: 12, optimal: 25 },
        { name: 'HR', capacity: 15, overload: 0, optimal: 15 },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-900/95 border border-gray-700 p-4 rounded-xl shadow-2xl backdrop-blur-xl">
                    <p className="text-white font-bold mb-3 border-b border-gray-800 pb-2">{label} Dept Workload</p>
                    {payload.map((pl, i) => (
                        <p key={i} className="text-sm font-semibold flex items-center gap-2 my-1" style={{ color: pl.color }}>
                            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: pl.color }}></span>
                            {pl.name}: {pl.value} hrs/wk
                        </p>
                    ))}
                    <div className="mt-3 pt-2 border-t border-gray-800">
                        <span className="text-xs text-gray-400">Total Assigned: {payload.reduce((sum, p) => sum + p.value, 0)} hrs</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl h-full flex flex-col relative group overflow-hidden">
            {/* Subtle background gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-rose-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                    <h3 className="text-xl font-bold text-white">Workload Distribution</h3>
                    <p className="text-sm text-gray-400 mt-1">Identify bandwidth and bottlenecks across teams</p>
                </div>
            </div>

            <div className="flex-1 w-full relative z-10 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
                        barSize={24}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={true} vertical={false} />
                        <XAxis type="number" stroke="#9ca3af" tickLine={false} axisLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                        <YAxis dataKey="name" type="category" stroke="#9ca3af" tickLine={false} axisLine={false} tick={{fill: '#e5e7eb', fontSize: 13, fontWeight: 600}} width={60} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                        <Legend wrapperStyle={{ paddingTop: '15px' }} iconType="circle" />
                        <Bar name="Optimal Load" dataKey="optimal" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
                        <Bar name="Overloaded" dataKey="overload" stackId="a" fill="#f43f5e" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WorkloadGraph;
