import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
 
const ProfilePage = () => {
    return (
      <div className="mx-auto bg-white shadow-md rounded-lg mt-8">
        {/* Profile and User Details section */}
        <div className="flex items-start  p-4">
          {/* Profile section */}
          <div className="flex items-center space-x-4  bg-[#D6DAEA]  pt-[100px] pb-[100px] pr-[100px]">
            <div className="relative w-24 h-24 ml-2">
              <Image
                src="/assets/images/profile-icon.png"
                alt="Profile Picture"
                className="rounded-full"
                layout="fill"
                objectFit="cover"
              />
                  <h2 className="text-xl font-semibold mt-[100px] text-nowrap">Naleen Khan</h2>
            </div>
            <div>
         
              <div className="flex space-x-2 mt-2">
              <Link href="profile/editprofile">
                {/* Replace <a> with a styled <button> */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Edit Profile
                </button>
              </Link>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Inbox
                </button>
              </div>
            </div>
          </div>
          {/* User details section */}
          <div className="space-y-2 ml-3 mt-10">
            <div>
              <p className="text-gray-600">Username</p>
              <p className="font-semibold">NaleenKhan</p>
            </div>
            <div>
              <p className="text-gray-600">Bio</p>
              <p className="font-semibold">Book Lover</p>
            </div>
            <div>
              <p className="text-gray-600">Location</p>
              <p className="font-semibold">Douglasdale</p>
            </div>
            <div>
              <p className="text-gray-600">Status</p>
              <div className="flex items-center justify-end">
                <span className="mr-2">Active</span>
                <input type="checkbox" className="toggle-checkbox" checked />
              </div>
            </div>
          </div>
        </div>
        {/* Listings section */}
        <div className="px-4 py-4">
          <h3 className="text-lg font-semibold mb-4">My Listings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Replace these divs with dynamic content as needed */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <Image src="/assets/images/book1.png" alt="Book 1" width={150} height={200} />
              <p className="mt-2 font-semibold">Author Your Life</p>
              <p className="text-gray-600">David McCrae</p>
              <p className="text-gray-800">$14.50</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <Image src="/assets/images/book2.png" alt="Book 2" width={150} height={200} />
              <p className="mt-2 font-semibold">Technology Programming</p>
              <p className="text-gray-600">David Lesiw</p>
              <p className="text-gray-800">$10.00</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <Image src="/assets/images/book3.png" alt="Book 3" width={150} height={200} />
              <p className="mt-2 font-semibold">Prisoner</p>
              <p className="text-gray-600">Arthur Miller</p>
              <p className="text-gray-800">$15.49</p>
            </div>
          </div>
        </div>
        {/* Stats section */}
        <div className="flex justify-between px-4 py-4 bg-gray-100 rounded-b-lg">
          <div>
            <p className="text-gray-600">Listings Completed</p>
            <p className="font-semibold text-2xl">37</p>
          </div>
          <div>
            <p className="text-gray-600">Ongoing Listings</p>
            <p className="font-semibold text-2xl">04</p>
          </div>
          <div>
            <p className="text-gray-600">Joined ScholarStack</p>
            <p className="font-semibold text-2xl">June 2024</p>
          </div>
        </div>
      </div>
    );
  };
 
export default ProfilePage;