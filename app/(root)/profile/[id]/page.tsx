import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { fetchAllBooks } from '@/lib/actions/book.actions';
import { IBook } from '@/lib/mongodb/database/models/book.model';
import { getUserByClerkId, updateUserLocation } from '@/lib/actions/user.actions';
import Profile from '@/components/shared/Profile';
import { daysSincePosted } from '@/lib/actions/datePosted';

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const user = await currentUser();

    if (!user) {
      return <p>Error loading user details. Please try again later.</p>;
    }

    const targetClerkId = id || user.id;

    if (!targetClerkId) {
      return <p>Error loading user details. Please try again later.</p>;
    }

    const ip = '127.0.0.1'; // Placeholder, replace with actual IP logic if needed
    await updateUserLocation(targetClerkId, ip, `/profile/${targetClerkId}`);

    let books: IBook[] = [];
    try {
      books = await fetchAllBooks();
    } catch (error) {
      console.error('Error fetching books:', error);
    }

    let userDetails = null;
    let dbUserId = null;

    try {
      userDetails = await getUserByClerkId(targetClerkId);
      dbUserId = userDetails._id;
    } catch (error) {
      console.error('Error fetching user details:', error);
    }

    if (!userDetails) {
      return <p>Error loading user details. Please try again later.</p>;
    }

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
      userId: targetClerkId,
      modalBooks,
    };

    return <Profile clerkId={user.id} {...userProps} />;
  } catch (error) {
    console.error('Error in ProfilePage component:', error);
    return <p>Error loading user details. Please try again later.</p>;
  }
};

export default ProfilePage;
