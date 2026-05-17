import React, { useEffect, useState } from 'react';
import api from '../../services/api.js';
import Card from '../../components/ui/Card.jsx';
import toast from 'react-hot-toast';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from 'recharts';
import ProductivityInsights from '../../components/analytics/ProductivityInsights.jsx';

const EmployeeAnalytics = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const { data } = await api.get('/goals');
                setGoals(data);
            } catch (error) {
                toast.error('Failed to load analytics');
            } finally {
                setLoading(false);
            }
        };
        fetchGoals();
    }, []);

    const statusCounts = goals.reduce((acc, goal) => {
        acc[goal.status] = (acc[goal.status] || 0) + 1;
        return acc;
    }, {});

    const pieData = Object.keys(statusCounts).map(status => ({ name: status, value: statusCounts[status] }));
    const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#64748b'];

    const barData = goals.map(goal => ({
        name: goal.title.substring(0, 10) + '...',
        target: goal.target,
        achievement: goal.achievement
    }));
    
    const trendData = [
        { month: 'Jan', velocity: 40 },
        { month: 'Feb', velocity: 45 },
        { month: 'Mar', velocity: 60 },
        { month: 'Apr', velocity: 55 },
        { month: 'May', velocity: 85 },
        { month: 'Jun', velocity: 92 },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-900/90 border border-gray-700 p-4 rounded-xl shadow-xl backdrop-blur-md">
                    <p className="text-white font-bold mb-2">{label}</p>
                    {payload.map((pl, i) => (
                        <p key={i} className="text-sm font-medium flex items-center gap-2" style={{ color: pl.color }}>
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: pl.color }}></span>
                            {pl.name}: {pl.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Performance Analytics</h1>
                <p className="text-gray-400 mt-2 text-lg">Deep dive into your performance metrics and velocity trends.</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <Card hoverEffect={true} className="p-6 lg:col-span-2 border-gray-800 bg-gray-900/50">
                        <div className="flex justify-between items-center mb-6">
                             <h2 className="text-xl font-bold text-white">Velocity Trend</h2>
                             <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-semibold border border-indigo-500/20">H1 2026</span>
                        </div>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                    <XAxis dataKey="month" stroke="#9ca3af" tickLine={false} axisLine={false} />
                                    <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="velocity" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorVelocity)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card hoverEffect={true} className="p-6 lg:col-span-1 border-gray-800 bg-gray-900/50 relative overflow-hidden flex flex-col">
                        <h2 className="text-xl font-bold text-white mb-2">Goals by Status</h2>
                        <p className="text-gray-400 text-sm tracking-wide mb-4">Distribution by phase</p>
                        <div className="h-64 w-full flex-1">
                            {pieData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie 
                                            data={pieData} 
                                            cx="50%" cy="50%" 
                                            innerRadius={70} 
                                            outerRadius={95} 
                                            paddingAngle={8} 
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-500">No data</div>
                            )}
                        </div>
                        {pieData.length > 0 && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ marginTop: '30px' }}>
                                <span className="text-4xl font-black text-white">{goals.length}</span>
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">Total</span>
                            </div>
                        )}
                    </Card>

                    <Card hoverEffect={true} className="p-6 lg:col-span-2 border-gray-800 bg-gray-900/50">
                        <h2 className="text-xl font-bold text-white mb-6">Target vs Achievement Gap</h2>
                        <div className="h-80 w-full relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-gradient-to-r from-indigo-500/5 to-emerald-500/5 blur-3xl pointer-events-none"></div>

                             {barData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }} barSize={20}>
                                        <defs>
                                            <linearGradient id="barTarget" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#6366f1" stopOpacity={1}/>
                                                <stop offset="100%" stopColor="#818cf8" stopOpacity={0.6}/>
                                            </linearGradient>
                                            <linearGradient id="barAchievement" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                                                <stop offset="100%" stopColor="#34d399" stopOpacity={0.6}/>
                                            </linearGradient>
                                        </defs>

                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                        <XAxis dataKey="name" stroke="#9ca3af" tickLine={false} axisLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                                        <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                                        <Bar dataKey="target" fill="url(#barTarget)" radius={[4, 4, 4, 4]} />
                                        <Bar dataKey="achievement" fill="url(#barAchievement)" radius={[4, 4, 4, 4]} />
                                    </BarChart>
                                </ResponsiveContainer>
                             ) : (
                                <div className="h-full flex items-center justify-center text-gray-500">No data</div>
                             )}
                        </div>
                    </Card>

                    <div className="lg:col-span-1">
                        <ProductivityInsights />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeAnalytics;
