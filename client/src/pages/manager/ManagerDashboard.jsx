import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { motion } from 'framer-motion';
import { Users, Target, Clock, Activity } from 'lucide-react';

import StatCardV2 from '../../components/analytics/StatCardV2.jsx';
import Heatmap from '../../components/analytics/Heatmap.jsx';
import ActivityTimeline from '../../components/analytics/ActivityTimeline.jsx';
import TopPerformers from '../../components/analytics/manager/TopPerformers.jsx';
import ApprovalAnalytics from '../../components/analytics/manager/ApprovalAnalytics.jsx';
import TeamPerformanceChart from '../../components/analytics/manager/TeamPerformanceChart.jsx';
import WorkloadGraph from '../../components/analytics/manager/WorkloadGraph.jsx';
import ManagerInsights from '../../components/analytics/manager/ManagerInsights.jsx';

const ManagerDashboard = () => {
    const { user } = useContext(AuthContext);

    // Provide synthetic stats for UI demonstration since this is a UI-only focus
    const getFakeHeatmapData = () => {
        const data = [];
        let currentDate = new Date();
        for (let i = 0; i < 180; i++) {
            if (Math.random() > 0.3) {
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
                    <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-bold tracking-wide mb-3">
                        Leadership Console
                    </motion.div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">Organization Overview, {user?.name?.split(' ')[0]}</h1>
                    <p className="text-gray-400 mt-2 text-lg font-medium tracking-wide">Oversee team performance, approvals, and macro-level objectives.</p>
                </div>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCardV2 
                    title="Active Team" 
                    value={24} 
                    icon={<Users className="w-6 h-6" />} 
                    trend={4}
                    color="blue"
                />
                <StatCardV2 
                    title="Total Objectives" 
                    value={142} 
                    icon={<Target className="w-6 h-6" />} 
                    trend={18}
                    color="purple"
                />
                <StatCardV2 
                    title="Pending Approvals" 
                    value={10} 
                    icon={<Clock className="w-6 h-6" />} 
                    color="orange"
                />
                <StatCardV2 
                    title="Avg Completion" 
                    value={76} 
                    suffix="%" 
                    icon={<Activity className="w-6 h-6" />} 
                    trend={12}
                    color="green"
                />
            </div>

            {/* Primary Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <TeamPerformanceChart />
                </div>
                <div className="lg:col-span-1">
                    <TopPerformers />
                </div>
            </div>

            {/* Workload, Insights & Approvals */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <ApprovalAnalytics />
                </div>
                <div className="lg:col-span-1">
                    <WorkloadGraph />
                </div>
                <div className="lg:col-span-1">
                    <ManagerInsights />
                </div>
            </div>

            {/* Heatmap & Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 h-full">
                    <div className="h-full">
                         <Heatmap data={getFakeHeatmapData()} />
                    </div>
                </div>
                <div className="lg:col-span-1 h-full">
                    <ActivityTimeline />
                </div>
            </div>
            
        </div>
    );
};

export default ManagerDashboard;
