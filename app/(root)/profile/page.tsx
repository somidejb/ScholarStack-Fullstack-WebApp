import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchAllBooks } from '@/lib/actions/book.actions';
import { auth } from '@clerk/nextjs/server';
import { IBook } from '@/lib/mongodb/database/models/book.model';
import { Collection } from '@/components/shared/Collection';
import NoActiveListings from '@/components/shared/NoActiveListing';

const ProfilePage: React.FC = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  let books: IBook[] = [];
  try {
    books = await fetchAllBooks();
  } catch (error) {
    console.error(error);
  }

  // Filter books based on user ID
  const userBooks = books.filter(book => book.bookOwner._id === userId);

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg">
      {/* Profile and User Details section */}
      <div className="flex items-start">
        {/* Profile section */}
       
        {/* User Details section */}
      </div>
      {/* Listings section */}
      <div className="px-20 py-20">
        {userBooks.length > 0 ? (
          <Collection
            collection_type="My Listings"
            books={userBooks}
            userId={userId}
          />
        ) : (
          <NoActiveListings />
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
    </div>
  );
};

export default ProfilePage; 