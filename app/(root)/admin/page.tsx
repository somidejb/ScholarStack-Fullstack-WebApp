// pages/admin/page.tsx
"use client";

import React from 'react';
import Sidebar from '@/components/admin/SideBar';
import Dashboard from '@/components/admin/Dashboard';
import Reports from '@/components/admin/Reports';
import { usePathname } from 'next/navigation';
import { CiSearch } from "react-icons/ci";

const AdminPage = () => {
  const pathname = usePathname();

  // Determine which component to render based on the current route
  const renderComponent = () => {
    switch (pathname) {
      case '/admin/dashboard':
        return <Dashboard />;
      case '/admin/reports':
        return <Reports />;
      default:
        return  <Reports /> ;
    }
  };

  return (
    <div className="flex bg-slate-100">
      <Sidebar />
      <div className="flex-grow p-8">
            <input
              placeholder="Search chat.."
              className="px-5 py-2.5 border shadow-md w-full rounded-2xl bg-white outline-none hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out"
            />
         
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminPage;
