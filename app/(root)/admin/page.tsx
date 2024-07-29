<<<<<<< HEAD
import React from 'react';
import Sidebar from '@/components/admin/SideBar';
import Dashboard from '@/components/admin/Dashboard';
import Reports from '@/components/admin/Reports';
import { fetchAllBooksAdmin } from '@/lib/actions/book.actions';

const AdminPage = async () => {
  const books = await fetchAllBooksAdmin();
=======

import React from 'react';
import Sidebar from '@/components/shared/SideBar';
import Dashboard from '@/components/shared/Dashboard';
import { fetchAllBooksAdmin } from '@/lib/actions/admin.action';
import { auth } from '@clerk/nextjs/server';
import { countAllUsers } from '@/lib/actions/user.actions';

const AdminPage = async () => {
  const books = await fetchAllBooksAdmin();
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId
  const totalSubs = await countAllUsers();
>>>>>>> 5fd023ca60559b4073af29ce2b01665f198f0a5d

  return (
    <div className="flex bg-slate-100  ">
      <Sidebar />
<<<<<<< HEAD
      <div className="flex-grow p-2 ">
        <Dashboard books={books} />
=======
      <div className="flex-grow p-8 ">
        <Dashboard books={books} path="/profile" totalSubs={totalSubs}/>
>>>>>>> 5fd023ca60559b4073af29ce2b01665f198f0a5d
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default AdminPage;
=======
export default AdminPage;
>>>>>>> 5fd023ca60559b4073af29ce2b01665f198f0a5d
