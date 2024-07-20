"use client";

import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const Dashboard = () => {
  const [approvalStatus, setApprovalStatus] = useState<null | 'approved' | 'rejected'>(null); // null, 'approved', 'rejected'

  const handleApprove = () => {
    setApprovalStatus('approved');
  };

  const handleReject = () => {
    setApprovalStatus('rejected');
  };

  return (
    <div className="p-3 sm:p-4 lg:p-5 xl:p-6">
      <h1 className="text-lg sm:text-xl lg:text-xl xl:text-2xl font-semibold mb-3 lg:mb-4 xl:mb-5">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 xl:gap-5">
        <Link href="/dashboard">
          <div className="cursor-pointer bg-blue-900 text-white p-2 sm:p-3 md:p-3 lg:p-4 xl:p-5 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
            <h2 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center">Total Users</h2>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center">125</p>
          </div>
        </Link>
        <Link href="/reports">
          <div className="cursor-pointer bg-gray-400 text-white p-2 sm:p-3 md:p-3 lg:p-4 xl:p-5 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
            <h2 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center">Reports</h2>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center">34</p>
          </div>
        </Link>
      </div>
      <div className="mt-4 sm:mt-6 lg:mt-6 xl:mt-8">
        <div className="bg-white p-3 sm:p-4 lg:p-5 xl:p-6 rounded-xl shadow-md flex flex-col space-y-3 hover:shadow-lg transition duration-200 ease-in-out">
          <div className="flex flex-col md:flex-row items-center md:space-x-3">
            <Image
              src="/assets/images/book2.png"
              alt="Book Cover"
              className="w-16 h-20 sm:w-20 sm:h-24 md:w-16 md:h-20 lg:w-24 lg:h-28 xl:w-28 xl:h-32"
              width={32}
              height={36}
            />
            <div className="flex-grow mt-3 md:mt-0">
              <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold">Title: Book Lovers by Emily Henry</h4>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">Posted by: Sarah Lim</p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">Date: February 14, 2024</p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">Price: $15.81</p>
            </div>
            <div className="flex space-x-2 mt-3 md:mt-0">
              <button
                className={`bg-green-600 text-white px-2 sm:px-3 py-1 sm:py-1 rounded-lg text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl flex items-center space-x-2 ${approvalStatus === 'approved' ? 'bg-opacity-60 cursor-not-allowed' : ''}`}
                onClick={handleApprove}
                disabled={approvalStatus === 'approved'}
              >
                <FaCheck className={`text-sm ${approvalStatus === 'approved' ? 'opacity-100' : 'opacity-0'}`} />
                <span>Approved</span>
              </button>
              <button
                className={`bg-red-600 text-white px-2 sm:px-3 py-1 sm:py-1 rounded-lg text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl flex items-center space-x-2 ${approvalStatus === 'rejected' ? 'bg-opacity-60 cursor-not-allowed' : ''}`}
                onClick={handleReject}
                disabled={approvalStatus === 'rejected'}
              >
                <FaTimes className={`text-sm ${approvalStatus === 'rejected' ? 'opacity-100' : 'opacity-0'}`} />
                <span>Rejected</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
