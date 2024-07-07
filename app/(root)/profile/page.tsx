import React from 'react';
import { currentUser } from "@clerk/nextjs/server";
import { fetchAllBooks } from '@/lib/actions/book.actions';
import { IBook } from '@/lib/mongodb/database/models/book.model';
import { getUserById } from '@/lib/actions/user.actions';
import Profile from '@/components/shared/Profile';

const ProfilePage: React.FC = async () => {
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
      userDetails = await getUserById(clerkId);
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
};

export default ProfilePage;