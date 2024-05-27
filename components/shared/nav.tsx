import Image from 'next/image';
import React from 'react';
 
const NavItems = () => {
  return (
    <div>
      {/* Side Navbar and Search Bar */}
      <div className="flex">
        <div className="rounded-3xl bg-white w-50 p-4 border flex-shrink-0 mt-3 mb-3 ml-2" style={{ height: 'fit-content' }}>
          <div className="flex items-center mb-4">
            <button className="text-blue-800 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <span className="text-blue-800 text-xl ml-4">Filters</span>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Categories</h3>
            <ul>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" style={{ accentColor: '#1D4ED8' }} />
                  <span className="ml-2">Fiction</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" style={{ accentColor: '#1D4ED8' }} />
                  <span className="ml-2">Business</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" style={{ accentColor: '#1D4ED8' }} />
                  <span className="ml-2">Law</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" style={{ accentColor: '#1D4ED8' }} />
                  <span className="ml-2">Health & Fitness</span>
                </label>
              </li>
            </ul>
            <a href="#" className="text-blue-600">See more...</a>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Others</h3>
            <ul>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" style={{ accentColor: '#1D4ED8' }} defaultChecked />
                  <span className="ml-2">English</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" style={{ accentColor: '#1D4ED8' }} />
                  <span className="ml-2">France</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" style={{ accentColor: '#1D4ED8' }} />
                  <span className="ml-2">Spanish</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" style={{ accentColor: '#1D4ED8' }} />
                  <span className="ml-2">Mandarin</span>
                </label>
              </li>
            </ul>
            <a href="#" className="text-blue-600">See more...</a>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Price</h3>
            <ul>
              <li>
                <label className="flex items-center bg-white">
                  <input type="checkbox" className="form-checkbox" style={{ accentColor: '#1D4ED8' }} />
                  <span className="ml-2">Under $5</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" style={{ accentColor: '#1D4ED8' }} />
                  <span className="ml-2">$5 - $10</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" style={{ accentColor: '#1D4ED8' }} defaultChecked />
                  <span className="ml-2">$10 - $25</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" style={{ accentColor: '#1D4ED8' }} />
                  <span className="ml-2">$25 - $50</span>
                </label>
              </li>
            </ul>
            <a href="#" className="text-blue-600">See more...</a>
          </div>
        </div>
        <div className="flex-1 p-4 ">
          <div className="flex justify-center relative">
            <input type="text" placeholder="Search here..." className=" border p-2 w-full max-w-lg rounded-3xl pr-12 bg-slate-700" />
            <svg className="w-6 h-6 text-gray-500 absolute right- top-1/2 transform -translate-y-1/2  translate-x-56" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1111 5a6 6 0 016 6z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default NavItems;