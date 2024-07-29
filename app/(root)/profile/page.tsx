import React from 'react';
<<<<<<< HEAD
=======
import { currentUser } from "@clerk/nextjs/server";
>>>>>>> 5fd023ca60559b4073af29ce2b01665f198f0a5d
import { fetchAllBooks } from '@/lib/actions/book.actions';
import { IBook } from '@/lib/mongodb/database/models/book.model';
import { getUserById, getUserById2 } from '@/lib/actions/user.actions';
import Profile from '@/components/shared/Profile';

const ProfilePage: React.FC = async () => {
<<<<<<< HEAD
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  console.log('User ID:', userId);

  let books: IBook[] = [];
=======
>>>>>>> 5fd023ca60559b4073af29ce2b01665f198f0a5d
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      console.log('No user found. User might not be authenticated.');
      return <p>Please sign in to view your profile.</p>;
    }

    const clerkId = clerkUser.id;
    console.log('Fetched user ID from Clerk:', clerkId);

    let userDetails = null;
    try {
      userDetails = await getUserById2(clerkId);
      if (!userDetails) {
        console.error('User details not found for clerkId:', clerkId);
        return <p>Error loading user details. Please try again later.</p>;
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      return <p>Error loading user details. Please try again later.</p>;
    }

    let books: IBook[] = [];
    try {
      books = await fetchAllBooks();
    } catch (error) {
      console.error('Error fetching books:', error);
    }

    const userBooks = books.filter(book => book.bookOwner?.toString() === userDetails._id.toString());

    const profileUser = {
      username: userDetails.username,
      fullName: `${userDetails.firstName} ${userDetails.lastName}`.trim(),
      imageUrl: userDetails.photo,
      joinedAt: userDetails.joinedAt,
    };

    const userProps = {
      user: profileUser,
      userDetails: {
        Bio: userDetails.bio || 'Please add a bio.',
        Location: userDetails.location || 'Please add a location.',
      },
      userBooks,
      userId: userDetails._id.toString(),
      clerkId: clerkUser.id,
    };

    return <Profile {...userProps} />;
  } catch (error) {
    console.error('Error in ProfilePage component:', error);
    return <p>Something went wrong. Please try again later.</p>;
  }
<<<<<<< HEAD

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
            isProfilePage={true} // Pass isProfilePage as true
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
=======
};

export default ProfilePage;
>>>>>>> 5fd023ca60559b4073af29ce2b01665f198f0a5d
