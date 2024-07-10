import React from 'react';
import Image from 'next/image';

const EditProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
      <div className="max-w-4xl w-full p-6 bg-white shadow-md rounded-lg space-y-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>
        <form className="space-y-6">
          <div className="bg-white p-4 rounded-md shadow-md">
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <div className="relative w-24 h-24 mt-2">
                <Image
                  src="/assets/images/profile-icon.png" 
                  alt="Profile Picture"
                  className="rounded-full"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <input type="file" className="mt-2 text-sm" />
            </div>
          </div>
          <div className="bg-[#DEDCFF] p-4 rounded-md shadow-md">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#DEDCFF]"
              defaultValue="Naleen Khan"
            />
          </div>
          <div className="bg-[#DEDCFF] p-4 rounded-md shadow-md">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#DEDCFF]"
              defaultValue="naleenkhan@gmail.com"
            />
          </div>
          <div className="bg-[#DEDCFF] p-4 rounded-md shadow-md">
            <label className="block text-sm font-medium text-gray-700">What’s your first name?</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#DEDCFF]"
            />
          </div>
          <div className="bg-[#DEDCFF] p-4 rounded-md shadow-md">
            <label className="block text-sm font-medium text-gray-700">And your last name?</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#DEDCFF]"
            />
          </div>
          <div className="bg-[#DEDCFF] p-4 rounded-md shadow-md">
            <label className="block text-sm font-medium text-gray-700">Phone number</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#DEDCFF]"
            />
          </div>
          <div className="bg-[#DEDCFF] p-4 rounded-md shadow-md">
            <label className="block text-sm font-medium text-gray-700">Select your gender</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#DEDCFF]"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="bg-[#DEDCFF] p-4 rounded-md shadow-md">
            <label className="block text-sm font-medium text-gray-700">What is your date of birth?</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-[#DEDCFF]"
            />
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <button
              type="submit"
              className="w-full bg-[#081F5C] text-white py-2 rounded-md"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;