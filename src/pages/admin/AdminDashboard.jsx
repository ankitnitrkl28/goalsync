import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import api from '../../services/api';
import Card from '../../components/ui/Card.jsx';
import Table from '../../components/ui/Table.jsx';
import Skeleton from '../../components/ui/Skeleton.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { IoCheckmarkCircleOutline, IoStatsChartOutline, IoTimeOutline, IoPeopleOutline, IoBusinessOutline } from 'react-icons/io5';

const StatCard = ({ title, value, icon, loading }) => (
    <Card hoverEffect={true} className="flex items-center p-6 gap-6">
        <div className="text-4xl text-cyan-500 bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20 shadow-inner">
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
            {loading ? <Skeleton type="text" className="w-16 h-8" /> : <h3 className="text-3xl font-bold text-white">{value}</h3>}
        </div>
    </Card>
);

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({});
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const [statsRes, usersRes] = await Promise.all([
                    api.get('/admin/stats'),
                    api.get('/admin/users')
                ]);
                setStats(statsRes.data);
                setUsers(usersRes.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, []);

    const userColumns = [
        { header: 'Name', cell: (row) => <div className="font-medium text-white">{row.name}</div> },
        { header: 'Email', cell: (row) => <span className="text-gray-400">{row.email}</span> },
        { header: 'Role', cell: (row) => <Badge variant={row.role === 'Admin' ? 'danger' : row.role === 'Manager' ? 'warning' : 'info'}>{row.role}</Badge> },
        { header: 'Department', cell: (row) => <span>{row.department || 'N/A'}</span> },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white">System Administration</h1>
                <p className="text-gray-400 mt-2 text-lg">Platform-wide overview and organization settings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={stats.totalEmployees + stats.totalManagers || 0} icon={<IoPeopleOutline />} loading={loading} />
                <StatCard title="Total Goals" value={stats.totalGoals || 0} icon={<IoBusinessOutline />} loading={loading} />
                <StatCard title="Org. Completion" value={`${stats.completionRate || 0}%`} icon={<IoStatsChartOutline className="text-green-500" />} loading={loading} />
                <StatCard title="Globally Pending" value={stats.pendingApprovals || 0} icon={<IoTimeOutline className="text-yellow-500" />} loading={loading} />
            </div>

            <Card className="p-0 overflow-hidden border border-gray-800">
                <div className="p-6 border-b border-gray-800 bg-gray-900/40">
                    <h2 className="text-xl font-bold text-white">User Directory</h2>
                </div>
                {loading ? (
                    <div className="p-12 text-center">
                        <Skeleton className="w-full h-40" />
                    </div>
                ) : (
                    <Table columns={userColumns} data={users} keyField="_id" />
                )}
            </Card>
        </div>
    );
};

export default AdminDashboard;
