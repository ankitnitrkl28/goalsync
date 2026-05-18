import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Card from '../../components/ui/Card.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import toast from 'react-hot-toast';

const QuarterlyCheckin = () => {
    const [goals, setGoals] = useState([]);
    const [selectedGoal, setSelectedGoal] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        quarter: 'Q1', achievement: '', status: 'On Track', comment: ''
    });

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const { data } = await api.get('/goals');
                setGoals(data.filter(g => g.approved));
            } catch (error) {
                toast.error('Failed to load goals');
            } finally {
                setLoading(false);
            }
        };
        fetchGoals();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!selectedGoal) return toast.error('Please select a goal');
        
        setSubmitting(true);
        try {
            await api.post('/checkins', { goalId: selectedGoal, ...formData });
            toast.success('Check-in submitted successfully');
            setFormData({ quarter: 'Q1', achievement: '', status: 'On Track', comment: '' });
            setSelectedGoal('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Submission failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white">Quarterly Check-In</h1>
                <p className="text-gray-400 mt-1">Submit your progress for approved goals</p>
            </div>

            <Card hoverEffect={true}>
                {loading ? (
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-800 rounded"></div>
                            </div>
                        </div>
                    </div>
                ) : goals.length === 0 ? (
                    <div className="text-center py-10">
                         <p className="text-gray-400">No approved goals available for check-in.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-sm font-medium text-gray-300 ml-1">Select Goal <span className="text-red-500">*</span></label>
                            <select 
                                value={selectedGoal} 
                                onChange={(e) => setSelectedGoal(e.target.value)}
                                required
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:border-blue-500 appearance-none"
                            >
                                <option value="" disabled>-- Choose a Goal --</option>
                                {goals.map(g => (
                                    <option key={g._id} value={g._id}>{g.title} (Target: {g.target} {g.uomType})</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-sm font-medium text-gray-300 ml-1">Quarter <span className="text-red-500">*</span></label>
                                <select 
                                    name="quarter" 
                                    value={formData.quarter} 
                                    onChange={handleChange}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:border-blue-500 appearance-none"
                                >
                                    <option value="Q1">Q1</option>
                                    <option value="Q2">Q2</option>
                                    <option value="Q3">Q3</option>
                                    <option value="Q4">Q4</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-sm font-medium text-gray-300 ml-1">Status <span className="text-red-500">*</span></label>
                                <select 
                                    name="status" 
                                    value={formData.status} 
                                    onChange={handleChange}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:border-blue-500 appearance-none"
                                >
                                    <option value="Not Started">Not Started</option>
                                    <option value="On Track">On Track</option>
                                    <option value="Delayed">Delayed</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <Input label="New Achievement Value" type="number" name="achievement" value={formData.achievement} onChange={handleChange} placeholder="Update your metric" required />
                        
                        <Input label="Notes / Comments" as="textarea" name="comment" value={formData.comment} onChange={handleChange} placeholder="Explain your progress..." />

                        <div className="flex justify-end pt-4 border-t border-gray-800">
                            <Button type="submit" isLoading={submitting}>Submit Check-In</Button>
                        </div>
                    </form>
                )}
            </Card>
        </div>
    );
};

export default QuarterlyCheckin;
