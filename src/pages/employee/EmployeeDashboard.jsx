import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import api from '../../services/api.js';
import StatCardV2 from '../../components/analytics/StatCardV2.jsx';
import Heatmap from '../../components/analytics/Heatmap.jsx';
import ActivityTimeline from '../../components/analytics/ActivityTimeline.jsx';
import GamificationBadge from '../../components/analytics/GamificationBadge.jsx';
import { Target, CheckCircle2, Clock3, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const EmployeeDashboard = () => {
    const { user } = useContext(AuthContext);
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const { data } = await api.get('/goals');
                setGoals(data);
            } catch (error) {
                console.error('Failed to fetch goals:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGoals();
    }, []);

    const completed = goals.filter(g => g.status === 'Completed').length;
    const totalWeight = goals.reduce((a,c) => a + c.weightage, 0);
    const overallProgress = totalWeight > 0 
        ? goals.reduce((acc, curr) => acc + (curr.achievement / curr.target) * curr.weightage, 0) / totalWeight * 100 
        : 0;
        
    // Generate some fake heatmap data to show off the visual
    const getFakeHeatmapData = () => {
        const data = [];
        let currentDate = new Date();
        for (let i = 0; i < 150; i++) {
            if (Math.random() > 0.4) {
                data.push({
                    date: currentDate.toISOString().split('T')[0],
                    count: Math.floor(Math.random() * 4) + 1
                });
            }
            currentDate.setDate(currentDate.getDate() - 1);
        }
        return data;
    };

    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-semibold mb-3">
                        Workspace Focus Mode
                    </motion.div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, {user?.name?.split(' ')[0]}</h1>
                    <p className="text-gray-400 mt-2 text-lg">Here is your high-level performance metrics for this quarter.</p>
                </div>
            </div>

            {/* V2 Stat Cards Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCardV2 
                    title="Total Objectives" 
                    value={goals.length} 
                    icon={<Target className="w-6 h-6" />} 
                    loading={loading} 
                    trend={12}
                    color="blue"
                />
                <StatCardV2 
                    title="Completed" 
                    value={completed} 
                    icon={<CheckCircle2 className="w-6 h-6" />} 
                    loading={loading} 
                    trend={5}
                    color="green"
                />
                <StatCardV2 
                    title="Action Required" 
                    value={goals.filter(g => !g.approved).length} 
                    icon={<Clock3 className="w-6 h-6" />} 
                    loading={loading} 
                    color="orange"
                />
                <StatCardV2 
                    title="Completion Rate" 
                    value={Math.round(overallProgress)} 
                    suffix="%" 
                    icon={<TrendingUp className="w-6 h-6" />} 
                    loading={loading} 
                    trend={8}
                    color="purple"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Gamification Panel */}
                <div className="lg:col-span-1">
                    <GamificationBadge xp={2840} level={12} streak={14} />
                </div>
                
                {/* Heatmap Panel */}
                <div className="lg:col-span-2">
                    <Heatmap data={getFakeHeatmapData()} />
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Activity Feed */}
                <div className="lg:col-span-2">
                    <ActivityTimeline />
                </div>

                {/* Additional Insight mapping or mini chart can go here */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl h-full flex flex-col justify-center items-center text-center relative overflow-hidden group">
                        {/* Decorative glow */}
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center mb-6 relative z-10 transition-transform duration-500 group-hover:scale-110">
                             <Target className="w-10 h-10 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 relative z-10">Ready for a challenge?</h3>
                        <p className="text-gray-400 text-sm mb-6 relative z-10">Create a new stretch goal to earn double XP this quarter.</p>
                        <button className="w-full py-3 bg-white text-gray-900 hover:bg-gray-200 rounded-xl font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all transform hover:-translate-y-1 relative z-10">
                            Declare New Goal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
