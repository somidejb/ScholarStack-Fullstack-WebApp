import React, { useState } from 'react';
import Filter from './Filter';

const categories = [
  { name: 'Fiction' },
  { name: 'Business' },
  { name: 'Law' },
  { name: 'Health & Fitness' },
  { name: 'Technology' },
  { name: 'Science' },
  // Add more items as needed
];

const languages = [
  { name: 'English', checked: true },
  { name: 'France' },
  { name: 'Spanish' },
  { name: 'Mandarin' },
  { name: 'German' },
  { name: 'Japanese' },
  // Add more items as needed
];

const prices = [
  { name: 'Under $5' },
  { name: '$5 - $10' },
  { name: '$10 - $25', checked: true },
  { name: '$25 - $50' },
  { name: 'Above $50' },
  // Add more items as needed
];

const Nav = () => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <button
        className="md:hidden bg-blue-500 text-white p-2 m-2 rounded-lg"
        onClick={toggleFilters}
      >
        Toggle Filters
      </button>
      <div
        className={`rounded-3xl bg-white w-full md:w-1/4 p-4 border flex-shrink-0 mt-3 mb-3 ml-2 ${showFilters ? 'block' : 'hidden'} md:block`}
        style={{ height: 'fit-content' }}
      >
        <div className="flex items-center mb-4">
          <button className="text-blue-800 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <span className="text-blue-800 text-xl ml-4">Filters</span>
        </div>
        <Filter title="Categories" items={categories} />
        <Filter title="Languages" items={languages} />
        <Filter title="Price" items={prices} />
      </div>
      <div className="flex-1 p-4">
        <div className="flex justify-center relative">
          <input
            type="text"
            placeholder="Search here..."
            className="border p-2 w-full max-w-lg rounded-3xl pr-12 bg-slate-700 text-white"
          />
          <svg
            className="w-6 h-6 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1111 5a6 6 0 016 6z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Nav;
