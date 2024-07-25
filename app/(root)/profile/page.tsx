import React from 'react';
import { auth, currentUser } from "@clerk/nextjs/server";
import { fetchAllBooks } from '@/lib/actions/book.actions';
import { IBook } from '@/lib/mongodb/database/models/book.model';
import { getUserById, updateUserLocation } from '@/lib/actions/user.actions';
import Profile from '@/components/shared/Profile';
import { daysSincePosted } from '@/lib/actions/datePosted';
import Modal from '@/components/shared/Modal';

const ProfilePage: React.FC = async () => {
  try {
    const { sessionClaims } = auth();
    console.log('Session Claims:', sessionClaims); // Debug log for session claims

    const userId = sessionClaims?.userId as string;
    const ip = sessionClaims?.ip as string;

    if (!userId) {
      console.log('No user ID found.');
      return <p>Please sign in to view your profile.</p>;
    }

    // Update user location
    await updateUserLocation(userId, ip, '/profile');

    let books: IBook[] = [];
    try {
      books = await fetchAllBooks();
    } catch (error) {
      console.error('Error fetching books:', error);
    }

    const userBooks = books.filter(book => book.bookOwner?._id === userId);

    let userDetails = null;
    try {
      userDetails = await getUserById(userId);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }

    if (!userDetails) {
      console.log('User details not found.');
      return <p>Error loading user details. Please try again later.</p>;
    }

    console.log('User email:', userDetails.email);
    console.log('User location:', userDetails.location);

    const userFavorites = books.filter(book => userDetails.favorites.includes(book._id));

    const modalBooks = userBooks.filter(book => {
      const daysPosted = daysSincePosted(new Date(book.postedAt));
      console.log(`Book title: ${book.title}, Days since posted: ${daysPosted}`);
      return daysPosted === 21;
    });

    const user = {
      username: userDetails.username,
      fullName: `${userDetails.firstName} ${userDetails.lastName}`.trim(),
      imageUrl: userDetails.photo,
      joinedAt: userDetails.joinedAt,
      email: userDetails.email,
    };

    const userProps = {
      user,
      userDetails: {
        Bio: userDetails.bio || 'Please add a bio.',
        Location: userDetails.location || 'Please add a location.',
      },
      userBooks,
      userFavorites,
      userId,
      modalBooks,
    };

    return <Profile clerkId={''} {...userProps} />;
  } catch (error) {
    console.error('Error in ProfilePage component:', error);
    return <p>Something went wrong. Please try again later.</p>;
  }
};

export default ProfilePage;
