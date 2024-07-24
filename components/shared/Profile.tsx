'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Collection } from './Collection';
import NoActiveListings from './NoActiveListing';
import { IBook } from '@/lib/mongodb/database/models/book.model';
import Modal from './Modal';
import { daysSincePosted } from '@/lib/actions/datePosted';

interface IUser {
  username: string;
  fullName: string;
  imageUrl: string;
  joinedAt: string;
  email: string;
}

interface IUserDetails {
  Bio: string;
  Location: string;
}

interface ProfileProps {
  user: IUser;
  userDetails: IUserDetails;
  userBooks: IBook[];
  userFavorites: IBook[];
  userId: string;
}

const Profile: React.FC<ProfileProps> = ({
  user,
  userDetails,
  userBooks,
  userFavorites,
  userId,
}) => {
  const [isChecked, setChecked] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBooks, setModalBooks] = useState<IBook[]>([]);
  const [lastDismissed, setLastDismissed] = useState<Date | null>(null); // New state to track the last dismissed date

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const now = new Date();

    if (lastDismissed) {
      const daysSinceDismissed = Math.floor((now.getTime() - lastDismissed.getTime()) / (1000 * 60 * 60 * 24));
      if (daysSinceDismissed < 7) return; // Don't open the modal if it has been dismissed within the last 7 days
    }

    const shouldOpenModal = userBooks.some(book => {
      const daysPosted = daysSincePosted(new Date(book.postedAt));
      return daysPosted % 7 === 0;
    });

    if (shouldOpenModal) {
      setModalBooks(userBooks.filter(book => {
        const daysPosted = daysSincePosted(new Date(book.postedAt));
        return daysPosted % 7 === 0;
      }));
      openModal();
    }
  }, [userBooks, lastDismissed]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleNotSold = () => {
    setLastDismissed(new Date()); // Set the current date as the last dismissed date
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg mt-[100px]">
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
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h2 className="text-xl font-semibold mt-4 text-nowrap">{user.fullName}</h2>
          </div>
          <div className="flex flex-col space-y-2">
            <Link href="/profile/edit">
              <button className="bg-[#081F5C] text-white px-12 py-3 rounded-md">
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
            <p className="font-semibold">{user.username}</p>
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
            <input
              type="checkbox"
              className="toggle-checkbox"
              checked={isChecked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <span className="font-semibold">Active</span>
          </div>
        </div>
      </div>

      {/* User Books Section */}
      <div className="px-20 py-20">
        {userBooks.length > 0 ? (
          <Collection
            collection_type="My Listings"
            books={userBooks}
            userId={userId}
            isProfilePage={true} // Pass isProfilePage as true
          />
        ) : (
          <NoActiveListings />
        )}
      </div>

      {/* Favorite Books Section */}
      <div className="px-20 py-20">
        {userFavorites.length > 0 ? (
          <Collection
            collection_type="My Favorite Books"
            books={userFavorites}
            userId={userId}
          />
        ) : (
          <p className="text-gray-600">You have no favorite books listed.</p>
        )}
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

      <Modal isOpen={isModalOpen} onClose={closeModal} books={modalBooks} userId={userId} handleNotSold={handleNotSold} />
    </div>
  );
};

export default Profile;
