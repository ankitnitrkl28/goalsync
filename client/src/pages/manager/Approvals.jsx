import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Table from '../../components/ui/Table.jsx';
import Button from '../../components/ui/Button.jsx';
import toast from 'react-hot-toast';

const Approvals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPendingGoals = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/goals');
            setGoals(data.filter(g => !g.approved));
        } catch (error) {
            toast.error('Failed to load pending goals');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingGoals();
    }, []);

    const approveGoal = async (id) => {
        try {
            await api.put(`/goals/${id}/approve`, { managerComment: 'Approved via Manager Dashboard' });
            toast.success('Goal Approved');
            setGoals(goals.filter(g => g._id !== id));
        } catch (error) {
            toast.error(error.response?.data?.message || 'Approval failed');
        }
    };

    const columns = [
        { header: 'Employee', cell: (row) => <div className="font-medium text-white">{row.employeeId?.name || 'Unknown'}</div> },
        { header: 'Goal Title', cell: (row) => <span>{row.title}</span> },
        { header: 'Category', cell: (row) => <span className="text-gray-400">{row.category}</span> },
        { header: 'Target', cell: (row) => <span>{row.target} {row.uomType}</span> },
        { header: 'Weightage', cell: (row) => <span>{row.weightage}%</span> },
        { 
            header: 'Actions', 
            cell: (row) => (
                <div className="flex gap-2">
                    <Button onClick={() => approveGoal(row._id)} className="!px-3 !py-1 text-xs">Approve</Button>
                </div>
            ) 
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white">Pending Approvals</h1>
                <p className="text-gray-400 mt-1">Review and approve team goals</p>
            </div>

            {loading ? (
                 <div className="flex justify-center p-12">
                     <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                 </div>
            ) : (
                <Table columns={columns} data={goals} keyField="_id" />
            )}
        </div>
    );
};

export default Approvals;
