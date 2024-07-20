"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { BsArrowLeftCircle, BsCheckCircle } from 'react-icons/bs';
import Link from 'next/link';

const report = {
  id: 12356,
  reporter: 'Sarah Lim',
  type: 'Inappropriate',
  date: 'November 17, 2024',
  details: 'The report was filed because the content was found to be inappropriate and violated community guidelines.',
  bookId: 7890, // Example book ID
};

const DetailedReport = () => {
  const [issueResolved, setIssueResolved] = useState(false);

  const handleResolveIssue = () => {
    // Logic to resolve the issue
    setIssueResolved(true);
    alert('Issue resolved');
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      <div>
        <button 
          onClick={() => window.history.back()} 
          className="text-gray-800 mb-3 sm:mb-4 flex items-center space-x-1 sm:space-x-2"
        >
          <BsArrowLeftCircle className="text-lg sm:text-xl" />
          <span className="text-sm sm:text-base">Back</span>
        </button>
      </div>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-5">Report Details</h1>
      <div className={`bg-white p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg shadow-md ${issueResolved ? 'bg-green-50' : ''}`}>
        <div className={`flex items-center mb-4 sm:mb-5 ${issueResolved ? 'animate-pulse' : ''}`}>
          <Image
            src="/assets/images/book1.png"
            alt="Book Cover"
            width={80}
            height={80}
            className="w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-36 mr-3 sm:mr-4"
          />
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Report ID: {report.id}</h2>
            <p className="text-sm sm:text-base md:text-lg font-semibold">Reported by: {report.reporter}</p>
            <p className="text-sm sm:text-base md:text-lg font-semibold">Type: {report.type}</p>
            <p className="text-sm sm:text-base md:text-lg font-semibold">Date: {report.date}</p>
          </div>
        </div>
        <div className="mb-4 sm:mb-5">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Details:</h3>
          <p className="text-sm sm:text-base md:text-lg">{report.details}</p>
        </div>
        <div className="flex flex-col sm:w-5 sm:flex-row text-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Link
            href={`/books/${report.bookId}`} // Navigate to book details page
            className="bg-blue-700 text-white py-1.5 px-3 sm:py-2 sm:px-4 rounded-md sm:rounded-lg text-sm sm:text-base font-semibold shadow-sm sm:shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            View Posting
          </Link>
          <button
            onClick={handleResolveIssue}
            className={` bg-green-500 flex justify-center items-center space-x-2 bg-${issueResolved ? 'green-600' : 'green-500'} text-white py-1.5 px-3 rounded-md sm:rounded-lg text-sm sm:text-base font-semibold shadow-sm sm:shadow-md hover:bg-${issueResolved ? 'green-700' : 'green-600'} transition duration-200 ease-in-out`}
          >
            {issueResolved && <BsCheckCircle className="text-lg" />}
            <span>{issueResolved ? 'Resolved' : 'Resolve Issue'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default DetailedReport;
