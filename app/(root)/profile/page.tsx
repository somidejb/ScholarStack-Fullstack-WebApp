"use client";
import React from 'react';
import {useUser} from "@clerk/nextjs";
import Image from 'next/image';
import Link from 'next/link';

const ProfilePage = () => {

    const {isSignedIn, user}= useUser();

    if (!isSignedIn) {
        return <p>Please sign in to view your profile.</p>;
    }

    return (
        <div className="mx-auto bg-white shadow-md rounded-lg">
            {/* Profile and User Details section */}
            <div className="flex items-start">
                {/* Profile section */}
                <div className="flex items-center justify-center bg-[#D6DAEA] p-8 pb-20 pt-20 w-2/3">
                    <div className="flex flex-col items-center mr-8">
                        <div className="relative w-36 h-36">
                            <Image
                                src="/assets/images/profile-icon.png"
                                alt="Profile Picture"
                                className="rounded-full"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <h2 className="text-xl font-semibold mt-4 text-nowrap">{user?.fullName}</h2>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Link href="/profile/edit">
                            <button className="bg-[#081F5C] text-white px-12 py-3 rounded-md" >
                                Edit Profile
                            </button>
                        </Link>
                        <button className="bg-[#081F5C] text-white px-6 py-3 rounded-md">
                            Inbox
                        </button>
                    </div>
                </div>
                {/* User details section */}
                <div className="space-y-2 ml-10 mt-10">
                    <div>
                        <p className="text-gray-600">Username</p>
                        <p className="font-semibold">{user?.username}</p>
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
                          <input type="checkbox" className="toggle-checkbox" checked />
                          <span className="font-semibold">Active</span>
                    </div>
                </div>
            </div>
            {/* Listings section */}
            <div className="px-20 py-20">
                <h3 className="text-lg font-bold mb-4">My Listings</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Replace these divs with dynamic content as needed */}
                    <div className="bg-gray-100 rounded-lg shadow-md">
                        <Image src="/assets/images/book1.png" alt="Book 1" width={120} height={160} />
                        <p className="mt-2 font-semibold text-sm">Author Your Life</p>
                        <p className="text-gray-600 text-sm">David McCrae</p>
                        <p className="text-gray-800 text-sm">$14.50</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg shadow-md">
                        <Image src="/assets/images/book2.png" alt="Book 2" width={120} height={160} />
                        <p className="mt-2 font-semibold text-sm">Technology Programming</p>
                        <p className="text-gray-600 text-sm">David Lesiw</p>
                        <p className="text-gray-800 text-sm">$10.00</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg shadow-md">
                        <Image src="/assets/images/book3.png" alt="Book 3" width={120} height={160} />
                        <p className="mt-2 font-semibold text-sm">Prisoner</p>
                        <p className="text-gray-600 text-sm">Arthur Miller</p>
                        <p className="text-gray-800 text-sm">$15.49</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg shadow-md">
                        <Image src="/assets/images/book4.png" alt="Book 4" width={120} height={160} />
                        <p className="mt-2 font-semibold text-sm">Prisoner</p>
                        <p className="text-gray-600 text-sm">Arthur Miller</p>
                        <p className="text-gray-800 text-sm">$15.49</p>
                    </div>
                </div>
            </div>
            {/* Stats section */}
            <div className="flex justify-between px-4 py-4 bg-[#081F5C]">
                <div>
                    <p className="text-white">Listings Completed</p>
                    <p className="text-white font-semibold text-2xl">37</p>
                </div>
                <div>
                    <p className="text-white">Ongoing Listings</p>
                    <p className="text-white font-semibold text-2xl">04</p>
                </div>
                <div>
                    <p className="text-white">Joined ScholarStack</p>
                    <p className="text-white font-semibold text-2xl">June 2024</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
