
import React from 'react';
import Sidebar from '@/components/shared/SideBar';
import Dashboard from '@/components/shared/Dashboard';
import Reports from '@/components/shared/Reports';
import { fetchAllBooksAdmin } from '@/lib/actions/book.actions';

const AdminPage = async () => {
  const books = await fetchAllBooksAdmin();

  return (
    <div className="flex bg-slate-100  ">
      <Sidebar />
      <div className="flex-grow p-8 ">
        <Dashboard books={books} />
      </div>
    </div>
  );
};

export default AdminPage;
