// pages/admin/dashboard.tsx
"use client";
import React from 'react';
import Dashboard from '@/components/admin/Dashboard';
import { BsArrowLeftCircle } from 'react-icons/bs';

const AdminDashboard = () => {
    
  return (
    <div>
      <button 
        onClick={() => window.history.back()} 
        className= "text-gray-800  mb-4  flex items-center space-x-2"
      >
        <BsArrowLeftCircle />
        <span>Back</span>
      </button>
      <Dashboard />
    </div>
  );
};

export default AdminDashboard;