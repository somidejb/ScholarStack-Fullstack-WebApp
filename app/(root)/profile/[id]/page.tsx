import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { fetchAllBooks } from '@/lib/actions/book.actions';
import { IBook } from '@/lib/mongodb/database/models/book.model';
import { getUserByClerkId, isUserOnline, updateUserLocation } from '@/lib/actions/user.actions';
import Profile from '@/components/shared/Profile';
import { daysSincePosted } from '@/lib/actions/datePosted';
import { fetchAllOrders } from '@/lib/actions/order.actions'; // Assuming this action exists

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const isOnline = await isUserOnline(id);

  try {
    const currentUserProf = await currentUser();

    if (!currentUserProf) {
      return <p>Error loading user details. Please try again later.</p>;
    }

    const targetClerkId = id;
    const currentUserClerkId = currentUserProf.id;
    const currentUserDb = await getUserByClerkId(currentUserClerkId);
    const currentUserDbId = currentUserDb?._id?.toString(); // Ensure currentUserDbId is a string

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
    let targetDbUserId: string | undefined = undefined;

    try {
      userDetails = await getUserByClerkId(targetClerkId);
      targetDbUserId = userDetails?._id?.toString(); // Ensure dbUserId is a string
    } catch (error) {
      console.error('Error fetching user details:', error);
    }

    if (!userDetails) {
      return <p>Error loading user details. Please try again later.</p>;
    }

    const userBooks = books.filter(book => String(book.bookOwner?._id) === String(targetDbUserId));
    const userFavorites = books.filter(book => userDetails.favorites.includes(book._id));
    const modalBooks = userBooks.filter(book => {
      const daysPosted = daysSincePosted(new Date(book.postedAt));
      return daysPosted === 21;
    });

    let completedListingsCount = 0;
    try {
      const orders = await fetchAllOrders();
      completedListingsCount = orders.filter((order: { seller: { _id: any; }; }) => String(order.seller._id) === String(targetDbUserId)).length;
    } catch (error) {
      console.error('Error fetching orders:', error);
    }

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
      dbUserId: targetDbUserId || "", // Ensure dbUserId is always a string
      bookCount: userBooks.length,
      completedListingsCount,
    };

    return <Profile clerkId={targetClerkId} currentUserClerkId={currentUserClerkId} currentUserDbId={currentUserDbId} isOnline={isOnline} {...userProps} />;
  } catch (error) {
    console.error('Error in ProfilePage component:', error);
    return <p>Error loading user details. Please try again later.</p>;
  }
};

export default ProfilePage;