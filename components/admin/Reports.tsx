"use client";
import React from 'react';
import Image from 'next/image';
import { BsArrowLeftCircle } from 'react-icons/bs';
import Link from 'next/link';

const reports = [
  { id: 12356, reporter: 'Sarah Lim', type: 'Inappropriate', date: 'November 17, 2024' },
  { id: 12357, reporter: 'John Doe', type: 'Spam', date: 'November 18, 2024' },
];

const Reports = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div>
    <button 
    onClick={() => window.history.back()} 
    className= "text-gray-800  mb-4  flex items-center space-x-2"
  >
    <BsArrowLeftCircle />
    <span>Back</span>
  </button>
  </div>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">Reports</h1>
      <div className="grid gap-4">
        {reports.map((report) => (
          <div 
            key={report.id} 
            className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow flex flex-col sm:flex-row items-center justify-between hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out"
          >
            <div className="flex items-center mb-4 sm:mb-0">
              <Image
                src="/assets/images/book1.png"
                alt="Book Cover"
                width={50}
                height={50}
                className="w-18 h-20 mr-4"
              />
              <div>
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold">Report ID: {report.id}</h2>
                <p className="text-sm sm:text-base">Reported by: {report.reporter}</p>
                <p className="text-sm sm:text-base">Type: {report.type}</p>
                <p className="text-sm sm:text-base">Date: {report.date}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link href={`/detailes`}>
              <button className="bg-blue-800 text-white py-1 px-2 sm:py-2 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm lg:text-base">View More</button> </Link>
              <button className="bg-green-700 text-white py-1 px-2 sm:py-2 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm lg:text-base">Resolve</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
