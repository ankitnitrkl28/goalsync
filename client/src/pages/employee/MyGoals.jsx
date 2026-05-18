import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Table from '../../components/ui/Table.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button.jsx';
import toast from 'react-hot-toast';

const MyGoals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchGoals = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/goals');
            setGoals(data);
        } catch (error) {
            toast.error('Failed to load goals');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    const deleteGoal = async (id) => {
        if(window.confirm('Are you sure you want to delete this goal?')) {
            try {
                await api.delete(`/goals/${id}`);
                setGoals(goals.filter(g => g._id !== id));
                toast.success('Goal deleted');
            } catch (error) {
                toast.error(error.response?.data?.message || 'Delete failed');
            }
        }
    };

    const columns = [
        { header: 'Goal Title', cell: (row) => <div className="font-medium text-white">{row.title}</div> },
        { header: 'Target', cell: (row) => <span>{row.target} {row.uomType}</span> },
        { header: 'Achievement', cell: (row) => <span>{row.achievement} {row.uomType}</span> },
        { header: 'Weightage', cell: (row) => <span>{row.weightage}%</span> },
        { 
            header: 'Status', 
            cell: (row) => {
                const variantMap = {
                    'Completed': 'success',
                    'On Track': 'info',
                    'Delayed': 'danger',
                    'Not Started': 'default'
                };
                return <Badge variant={variantMap[row.status]}>{row.status}</Badge>;
            }
        },
        { 
            header: 'Approval', 
            cell: (row) => row.approved ? <Badge variant="success">Approved</Badge> : <Badge variant="warning">Pending</Badge> 
        },
        { 
            header: 'Actions', 
            cell: (row) => (
                <div className="flex gap-2">
                    {!row.approved && (
                        <Button variant="danger" onClick={() => deleteGoal(row._id)} className="!px-3 !py-1 text-xs">Delete</Button>
                    )}
                </div>
            ) 
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">My Goals</h1>
                    <p className="text-gray-400 mt-1">Manage and track your performance objectives</p>
                </div>
                <Link to="/employee/goals/create">
                    <Button>+ Create New Goal</Button>
                </Link>
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

export default MyGoals;
