// pages/admin/page.tsx
"use client";

import React from 'react';
import Sidebar from '@/components/shared/SideBar';
import Dashboard from '@/components/shared/Dashboard';
import Reports from '@/components/shared/Reports';
import { usePathname } from 'next/navigation';
import { CiSearch } from "react-icons/ci";
import BookCardAdmin from '@/components/shared/BookCardAdmin';

const AdminPage = () => {
  const pathname = usePathname();

  const books = [
    {
      title: 'Book Lovers by Emily Henry',
      postedBy: 'Sarah Lim',
      date: 'February 14, 2024',
      price: '$15.81',
      imageUrl: '/assets/images/book-admin.png',
    },
    {
      title: 'Book Lovers by Emily Henry',
      postedBy: 'Sarah Lim',
      date: 'February 14, 2024',
      price: '$15.81',
      imageUrl: '/assets/images/book-admin.png',
    },
    {
      title: 'Book Lovers by Emily Henry',
      postedBy: 'Sarah Lim',
      date: 'February 14, 2024',
      price: '$15.81',
      imageUrl: '/assets/images/book-admin.png',
    },
    {
      title: 'Book Lovers by Emily Henry',
      postedBy: 'Sarah Lim',
      date: 'February 14, 2024',
      price: '$15.81',
      imageUrl: '/assets/images/book-admin.png',
    },
    {
      title: 'Book Lovers by Emily Henry',
      postedBy: 'Sarah Lim',
      date: 'February 14, 2024',
      price: '$15.81',
      imageUrl: '/assets/images/book-admin.png',
    },
    {
      title: 'Book Lovers by Emily Henry',
      postedBy: 'Sarah Lim',
      date: 'February 14, 2024',
      price: '$15.81',
      imageUrl: '/assets/images/book-admin.png',
    },
    {
      title: 'Book Lovers by Emily Henry',
      postedBy: 'Sarah Lim',
      date: 'February 14, 2024',
      price: '$15.81',
      imageUrl: '/assets/images/book-admin.png',
    },
    {
      title: 'Book Lovers by Emily Henry',
      postedBy: 'Sarah Lim',
      date: 'February 14, 2024',
      price: '$15.81',
      imageUrl: '/assets/images/book-admin.png',
    },
  
  ];
  // Determine which component to render based on the current route
  const renderComponent = () => {
    switch (pathname) {
      case '/admin/dashboard':
        //return <Dashboard />;
      case '/admin/reports':
        return <Reports />;
      default:
        return  <Dashboard books={books}/> ;
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
