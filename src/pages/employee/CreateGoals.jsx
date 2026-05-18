import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Card from '../../components/ui/Card.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import toast from 'react-hot-toast';

const CreateGoals = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '', description: '', target: '', weightage: '',
        uomType: '', deadline: '', priority: 'Medium', category: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(Number(formData.weightage) < 10 || Number(formData.weightage) > 100) {
            return toast.error("Weightage must be between 10 and 100");
        }

        setIsLoading(true);
        try {
            await api.post('/goals', formData);
            toast.success('Goal created successfully.');
            navigate('/employee/goals');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create goal');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white">Create New Goal</h1>
                <p className="text-gray-400 mt-1">Define an objective to track for this quarter</p>
            </div>

            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Goal Title" name="title" value={formData.title} onChange={handleChange} required />
                        <Input label="Category / Pillar" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Technical, Soft Skills" required />
                    </div>

                    <Input label="Description" as="textarea" name="description" value={formData.description} onChange={handleChange} required />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input label="Target Value" type="number" name="target" value={formData.target} onChange={handleChange} required />
                        <Input label="Unit of Measurement" name="uomType" value={formData.uomType} onChange={handleChange} placeholder="e.g. %, Count, $" required />
                        <Input label="Weightage (%)" type="number" name="weightage" value={formData.weightage} onChange={handleChange} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Deadline" type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-sm font-medium text-gray-300 ml-1">Priority</label>
                            <select 
                                name="priority" 
                                value={formData.priority} 
                                onChange={handleChange}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:border-blue-500 appearance-none"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-800">
                        <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
                        <Button type="submit" isLoading={isLoading}>Save Goal</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CreateGoals;
