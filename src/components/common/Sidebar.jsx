import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

import {
    IoHomeOutline,
    IoListOutline,
    IoSettingsOutline,
    IoPersonOutline,
    IoPieChartOutline,
    IoLogOutOutline
} from 'react-icons/io5';

const Sidebar = () => {

    const { user, logout } = useContext(AuthContext);

    const role = user?.role?.toLowerCase();

    let menuItems = [];

    if (role === 'manager') {
        menuItems = [
            { path: `/manager/dashboard`, name: 'Dashboard', icon: <IoHomeOutline /> },
            { path: `/manager/approvals`, name: 'Approvals', icon: <IoPersonOutline />, badge: '12' },
            { path: `/manager/team`, name: 'Team Overview', icon: <IoListOutline /> },
            { path: `/manager/employees`, name: 'Employees', icon: <IoPersonOutline /> },
            { path: `/manager/reports`, name: 'Reports', icon: <IoPieChartOutline /> },
        ];
    } else {
        // Employee and Admin base
        menuItems = [
            { path: `/${role}/dashboard`, name: 'Dashboard', icon: <IoHomeOutline /> },
            { path: `/${role}/goals`, name: 'My Goals', icon: <IoListOutline /> },
            { path: `/${role}/analytics`, name: 'Analytics', icon: <IoPieChartOutline /> },
        ];

        if (role === 'admin') {
            menuItems.push({ path: `/admin/approvals`, name: 'Approvals', icon: <IoPersonOutline /> });
            menuItems.push({ path: `/admin/dashboard`, name: 'Admin Hub', icon: <IoSettingsOutline /> });
        }
    }

    return (
        <aside className="w-64 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 flex flex-col hidden md:flex z-10 transition-all duration-300">

            {/* Logo */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <span className="text-white font-bold text-lg">G</span>
                </div>

                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
                    GoalPortal
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 mt-6 space-y-2 overflow-y-auto">

                <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Menu
                </p>

                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                                isActive
                                    ? 'bg-blue-600/10 text-blue-400 font-medium'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <div className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-md"></div>
                                )}

                                <span
                                    className={`text-xl ${
                                        isActive
                                            ? 'text-blue-500'
                                            : 'text-gray-500 group-hover:text-blue-400 transition-colors'
                                    }`}
                                >
                                    {item.icon}
                                </span>

                                <span className="flex-1 text-left">{item.name}</span>

                                {item.badge && (
                                    <span className="bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                        {item.badge}
                                    </span>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group"
                >
                    <IoLogOutOutline className="text-xl group-hover:text-red-500 transition-colors" />
                    Logout
                </button>
            </div>

        </aside>
    );
};

export default Sidebar;