import React from 'react';
import { fetchAllBooks } from '@/lib/actions/book.actions';
import { auth } from '@clerk/nextjs/server';
import { IBook } from '@/lib/mongodb/database/models/book.model';
import { getUserById } from '@/lib/actions/user.actions';
import Profile from '@/components/shared/Profile';
import { daysSincePosted } from '@/lib/actions/datePosted';
import { sendEmail } from '@/lib/actions/email';


const ProfilePage: React.FC = async () => {
  try {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    console.log('User ID:', userId);

    if (!userId) {
      return <p>Please sign in to view your profile.</p>;
    }

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
      return <p>Error loading user details. Please try again later.</p>;
    }

    const userFavorites = books.filter(book => userDetails.favorites.includes(book._id));

    // Check if any book listed by the user has been posted for 7 days
    for (const book of userBooks) {
      const daysPosted = daysSincePosted(new Date(book.postedAt));
      console.log(`Days since posted: ${daysPosted}`);

      if (daysPosted === 7) {
        await sendEmail(userDetails.email, book.title);
      }
    }

    const user = {
      username: userDetails.username,
      fullName: `${userDetails.firstName} ${userDetails.lastName}`,
      imageUrl: userDetails.photo,
      joinedAt: userDetails.joinedAt,
    };

    const userProps = {
      user,
      userDetails: {
        Bio: userDetails.bio,
        Location: userDetails.location,
      },
      userBooks,
      userFavorites, // Adding the favorite books
      userId, 
    };

    return <Profile {...userProps} />;
  } catch (error) {
    console.error('Error in ProfilePage component:', error);
    return <p>Something went wrong. Please try again later.</p>;
  }
};

export default ProfilePage;