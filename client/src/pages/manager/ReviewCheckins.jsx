import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Table from '../../components/ui/Table.jsx';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import toast from 'react-hot-toast';

const ReviewCheckins = () => {
    const [checkins, setCheckins] = useState([]);
    
    useEffect(() => {
        setCheckins([]);
    }, []);

    const columns = [
        { header: 'Goal Title', cell: (row) => <span>{row.goalTitle}</span> },
        { header: 'Quarter', cell: (row) => <span>{row.quarter}</span> },
        { header: 'Achievement', cell: (row) => <span>{row.achievement}</span> },
        { header: 'Status Update', cell: (row) => <Badge>{row.status}</Badge> },
        { 
            header: 'Actions', 
            cell: (row) => (
                <div className="flex gap-2">
                    <Button className="!px-3 !py-1 text-xs">Approve</Button>
                </div>
            ) 
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white">Check-In Reviews</h1>
                <p className="text-gray-400 mt-1">Review quarterly progress updates from your team</p>
            </div>
            <Table columns={columns} data={checkins} keyField="_id" />
        </div>
    );
};

export default ReviewCheckins;
