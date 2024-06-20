"use client";
import React, { useEffect, useState } from 'react';
import {useUser} from "@clerk/nextjs";
import Image from 'next/image';
import Link from 'next/link';
import { getUserById } from '@/lib/actions/user.actions';
 
const ProfilePage = () => {
 
    const {isSignedIn, user}= useUser();
    const [userDetails, setUserDetails] = useState({Bio: '', Location: ''});
 
    useEffect(() => {
        if (isSignedIn) {
            const fetchUserDetails = async () => {
                const response = await getUserById(user.id);
                setUserDetails({
                    Bio: response.bio || 'N/A',
                    Location: response.location || 'N/A',
                });
            };
 
            fetchUserDetails();
        }
    }, [isSignedIn, user]);
 
    if (!isSignedIn) {
        return <p>Please wait.....</p>;
    }
 
    console.log('Rendering profile page for user:', user);
    return (
        <div className="mx-auto bg-white shadow-md rounded-lg">
            {/* Profile and User Details section */}
            <div className="flex items-start">
                {/* Profile section */}
                <div className="flex items-center justify-center bg-[#D6DAEA] p-8 pb-20 pt-20 w-2/3">
                    <div className="flex flex-col items-center mr-8">
                        <div className="relative w-36 h-36">
                        <Image
                                src={user.imageUrl || "/assets/images/profile-icon.png"}
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
                        <p className="font-semibold">{userDetails.Bio}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Location</p>
                        <p className="font-semibold">{userDetails.Location}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Status</p>
                          <input type="checkbox" className="toggle-checkbox" checked />
                          <span className="font-semibold">Active</span>
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
