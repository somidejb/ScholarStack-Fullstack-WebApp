"use client";

import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const Dashboard = () => {
  // Initial state for books, each with an approvalStatus property
  const [books, setBooks] = useState([
    { title: "Under The Rain", author: "Sarah Wins", price: 12, genre: "Fiction", img: "/assets/images/book1.png", approvalStatus: null },
    { title: "Midnight Dreams", author: "Shreya", price: 4.2, genre: "Drama", img: "/assets/images/book2.png", approvalStatus: null },
    { title: "Day Remember", author: "Nicholas", price: 42, genre: "Love", img: "/assets/images/book3.png", approvalStatus: null },
  ]);

  const handleApprove = (index) => {
    const updatedBooks = books.map((book, i) => 
      i === index ? { ...book, approvalStatus: 'approved' } : book
    );
    setBooks(updatedBooks);
  };

  const handleReject = (index) => {
    const updatedBooks = books.map((book, i) => 
      i === index ? { ...book, approvalStatus: 'rejected' } : book
    );
    setBooks(updatedBooks);
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
        <div className="space-y-4">
          {books.map((book, index) => (
            <div key={index} className="bg-white p-3 sm:p-4 lg:p-5 xl:p-6 rounded-xl shadow-md flex flex-col space-y-3 hover:shadow-lg transition duration-200 ease-in-out">
              <div className="flex items-center space-x-3">
                <Image
                  src={book.img}
                  alt="Book Cover"
                  className="w-16 h-20 sm:w-20 sm:h-24 md:w-16 md:h-20 lg:w-24 lg:h-28 xl:w-28 xl:h-32"
                  width={32}
                  height={36}
                />
                <div className="flex-grow">
                  <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold">{book.title}</h4>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">By: {book.author}</p>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">Price: {book.price}</p>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{book.genre}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className={`bg-green-600 text-white px-2 sm:px-3 py-1 sm:py-1 rounded-lg text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl flex items-center space-x-2 ${book.approvalStatus === 'approved' ? 'bg-opacity-60 cursor-not-allowed' : ''}`}
                  onClick={() => handleApprove(index)}
                  disabled={book.approvalStatus === 'approved'}
                >
                  <FaCheck className={`text-sm ${book.approvalStatus === 'approved' ? 'opacity-100' : 'opacity-0'}`} />
                  <span>Approved</span>
                </button>
                <button
                  className={`bg-red-600 text-white px-2 sm:px-3 py-1 sm:py-1 rounded-lg text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl flex items-center space-x-2 ${book.approvalStatus === 'rejected' ? 'bg-opacity-60 cursor-not-allowed' : ''}`}
                  onClick={() => handleReject(index)}
                  disabled={book.approvalStatus === 'rejected'}
                >
                  <FaTimes className={`text-sm ${book.approvalStatus === 'rejected' ? 'opacity-100' : 'opacity-0'}`} />
                  <span>Rejected</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> 
    </div>
  );
};

export default Dashboard;
