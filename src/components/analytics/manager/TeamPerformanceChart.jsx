import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TeamPerformanceChart = () => {
    // Synthetic team progress tracking
    const data = [
        { month: 'Jan', 'Team A': 45, 'Team B': 30 },
        { month: 'Feb', 'Team A': 52, 'Team B': 42 },
        { month: 'Mar', 'Team A': 68, 'Team B': 51 },
        { month: 'Apr', 'Team A': 74, 'Team B': 65 },
        { month: 'May', 'Team A': 85, 'Team B': 70 },
        { month: 'Jun', 'Team A': 91, 'Team B': 88 },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-900/90 border border-gray-700 p-4 rounded-xl shadow-xl backdrop-blur-md">
                    <p className="text-white font-bold mb-2 tracking-wide uppercase">{label}</p>
                    {payload.map((pl, i) => (
                        <p key={i} className="text-sm font-bold flex items-center justify-between gap-4" style={{ color: pl.color }}>
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: pl.color }}></span>
                                {pl.name}
                            </span>
                            <span>{pl.value}%</span>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl h-full flex flex-col group relative">
            <div className="flex items-center justify-between mb-8 z-10">
                <div>
                    <h3 className="text-xl font-bold text-white">Team Velocity</h3>
                    <p className="text-sm text-gray-400 mt-1">Cross-departmental progression trajectory</p>
                </div>
                <select className="bg-gray-800/80 border border-gray-700 text-sm font-semibold text-white px-3 py-1.5 rounded-lg outline-none cursor-pointer focus:ring-1 focus:ring-blue-500">
                    <option>Year to Date</option>
                    <option>Last 6 Months</option>
                    <option>Last Quarter</option>
                </select>
            </div>

            <div className="flex-1 w-full min-h-[300px] z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorTeamA" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorTeamB" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                        <XAxis dataKey="month" stroke="#9ca3af" tickLine={false} axisLine={false} tick={{fill: '#9ca3af', fontSize: 13, fontWeight: 500}} />
                        <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="Team A" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTeamA)" />
                        <Area type="monotone" dataKey="Team B" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorTeamB)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TeamPerformanceChart;
