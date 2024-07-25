import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { fetchAllBooks } from '@/lib/actions/book.actions';
import { IBook } from '@/lib/mongodb/database/models/book.model';
import { getUserById, updateUserLocation } from '@/lib/actions/user.actions';
import Profile from '@/components/shared/Profile';
import { daysSincePosted } from '@/lib/actions/datePosted';

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const user = await currentUser();

    // If user is null, return an error message
    if (!user) {
      return <p>Error loading user details. Please try again later.</p>;
    }

    const targetUserId = id || user.id;

    if (!targetUserId) {
      return <p>Error loading user details. Please try again later.</p>;
    }

    const ip = '127.0.0.1'; // Placeholder, replace with actual IP logic if needed
    await updateUserLocation(targetUserId, ip, `/profile/${targetUserId}`);

    let books: IBook[] = [];
    try {
      books = await fetchAllBooks();
    } catch (error) {
      console.error('Error fetching books:', error);
    }
   
    let userDetails = null;
    let dbUserId = null;

    try {
      userDetails = await getUserById(targetUserId);
      dbUserId = userDetails._id;
    } catch (error) {
      console.error('Error fetching user details:', error);
    }

    if (!userDetails) {
      return <p>Error loading user details. Please try again later.</p>;
    }

    // Ensure IDs are compared as strings
    const userBooks = books.filter(book => String(book.bookOwner?._id) === String(dbUserId));
    console.log('User books:', userBooks);

    const userFavorites = books.filter(book => userDetails.favorites.includes(book._id));

    const modalBooks = userBooks.filter(book => {
      const daysPosted = daysSincePosted(new Date(book.postedAt));
      return daysPosted === 21;
    });

    const userProps = {
      user: {
        username: userDetails.username,
        fullName: `${userDetails.firstName} ${userDetails.lastName}`.trim(),
        imageUrl: userDetails.photo,
        joinedAt: userDetails.joinedAt,
        email: userDetails.email,
      },
      userDetails: {
        Bio: userDetails.bio || 'Please add a bio.',
        Location: userDetails.location || 'Please add a location.',
      },
      userBooks,
      userFavorites,
      userId: targetUserId,
      modalBooks,
    };

    return <Profile clerkId={user.id} {...userProps} />;
  } catch (error) {
    console.error('Error in ProfilePage component:', error);
    return <p>Error loading user details. Please try again later.</p>;
  }
};

export default ProfilePage;
