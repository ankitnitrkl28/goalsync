import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Target, AlertCircle } from 'lucide-react';

const ActivityTimeline = ({ activities = [] }) => {
    // Fake activity data if empty
    const timelineData = activities.length ? activities : [
        { id: 1, title: 'Goal Completed', desc: 'Deployed V2 Dashboard', type: 'success', time: '2 hours ago' },
        { id: 2, title: 'Goal Created', desc: 'Q3 Product Roadmap', type: 'info', time: '1 day ago' },
        { id: 3, title: 'Check-In Reviewed', desc: 'Manager approved Q2 metrics', type: 'warning', time: '3 days ago' },
        { id: 4, title: 'Deadline Missed', desc: 'Marketing campaign launch', type: 'danger', time: '1 week ago' },
    ];

    const getIcon = (type) => {
        switch(type) {
            case 'success': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
            case 'warning': return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'danger': return <AlertCircle className="w-5 h-5 text-rose-500" />;
            default: return <Target className="w-5 h-5 text-blue-500" />;
        }
    };

    return (
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl h-full">
            <h3 className="text-lg font-bold text-white mb-6">Activity Timeline</h3>
            <div className="relative border-l border-gray-800 ml-3 space-y-8">
                {timelineData.map((activity, index) => (
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={activity.id} 
                        className="relative pl-8"
                    >
                        <div className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 shadow-md">
                            {getIcon(activity.type)}
                        </div>
                        <div>
                            <h4 className="text-md font-semibold text-gray-200">{activity.title}</h4>
                            <p className="text-sm text-gray-400 mt-1">{activity.desc}</p>
                            <span className="text-xs text-gray-500 mt-2 block font-medium">{activity.time}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <div className="mt-8 text-center border-t border-gray-800/80 pt-4">
                <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    View Complete Log →
                </button>
            </div>
        </div>
    );
};

export default ActivityTimeline;