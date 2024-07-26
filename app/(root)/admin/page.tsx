import React from 'react';
import Sidebar from '@/components/admin/SideBar';
import Dashboard from '@/components/admin/Dashboard';
import Reports from '@/components/admin/Reports';
import { fetchAllBooksAdmin } from '@/lib/actions/book.actions';

const AdminPage = async () => {
  const books = await fetchAllBooksAdmin();

  return (
    <div className="flex bg-slate-100  ">
      <Sidebar />
      <div className="flex-grow p-2 ">
        <Dashboard books={books} />
      </div>
    </div>
  );
};

export default AdminPage;