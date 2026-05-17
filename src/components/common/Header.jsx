import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { IoNotificationsOutline, IoSearchOutline } from 'react-icons/io5';

const Header = () => {
    const { user } = useContext(AuthContext);

    return (
        <header className="h-[76px] border-b border-gray-800 flex items-center justify-between px-8 bg-gray-900/30 backdrop-blur-md z-10 sticky top-0">
            <div className="flex items-center bg-gray-900/50 border border-gray-800 rounded-full px-4 py-2 w-96 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all duration-300">
                <IoSearchOutline className="text-gray-500 text-lg mr-2" />
                <input 
                    type="text" 
                    placeholder="Search goals..." 
                    className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-500"
                />
            </div>

            <div className="flex items-center gap-6">
                <button className="relative text-gray-400 hover:text-white transition-colors">
                    <IoNotificationsOutline size={24} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-gray-900"></span>
                </button>
                <div className="flex items-center gap-3 border-l border-gray-800 pl-6">
                    <div className="text-right hidden sm:block">
                        <span className="text-sm font-medium text-white leading-none block">{user?.name}</span>
                        <span className="text-xs text-blue-400 mt-1 block">{user?.role}</span>
                    </div>
                    <img 
                        src={user?.avatar} 
                        alt="Avatar" 
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-800 hover:border-blue-500 transition-colors duration-300 cursor-pointer" 
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
