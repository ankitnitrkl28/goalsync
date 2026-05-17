import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext.jsx';
import Sidebar from '../components/common/Sidebar.jsx';
import Header from '../components/common/Header.jsx';

const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <Header />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0a0a0a] p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
            <Toaster position="top-right" toastOptions={{
                 style: { background: '#1f2937', color: '#fff' }
            }} />
        </div>
    );
};

export default DashboardLayout;
