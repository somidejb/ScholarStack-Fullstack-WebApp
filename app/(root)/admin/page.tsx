
import React from 'react';
import Sidebar from '@/components/shared/SideBar';
import Dashboard from '@/components/shared/Dashboard';
import { fetchAllBooksAdmin } from '@/lib/actions/admin.action';
import { auth } from '@clerk/nextjs/server';

const AdminPage = async () => {
  const books = await fetchAllBooksAdmin();
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId

  return (
    <div className="flex bg-slate-100  ">
      <Sidebar />
      <div className="flex-grow p-8 ">
        <Dashboard books={books} path="/profile"/>
      </div>
    </div>
  );
};

export default AdminPage;
