
import React from 'react';
import Sidebar from '@/components/shared/SideBar';
import Dashboard from '@/components/shared/Dashboard';
import { fetchAllBooksAdmin } from '@/lib/actions/book.actions';

const AdminPage = async () => {
  const books = await fetchAllBooksAdmin();

  return (
    <div className="flex flex-col md:flex-row bg-slate-100 min-h-screen">
      <Sidebar />
      <div className="flex-grow p-4 md:p-2">
        <Dashboard books={books} />
      </div>
    </div>
  );
};

export default AdminPage;

