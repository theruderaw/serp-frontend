import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = () => (
    <div className="min-h-screen flex bg-[#F0F2F8]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
            <Topbar />
            <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    </div>
);

export default Layout;