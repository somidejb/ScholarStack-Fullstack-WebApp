// lib/extendPostedDate.ts
import { sendEmail } from './email';
import { daysSincePosted } from '@/lib/actions/datePosted';

export const handleBookNotification = async (book: any, email: string) => {
  // Calculate the number of days since the book was posted
  const daysPosted = daysSincePosted(book.postedAt);

  // Check if the book has been posted for multiples of 7 days
  if (daysPosted % 7 === 0) {
    // If daysPosted is a multiple of 7, send an email
    await sendEmail(email, book.title);
  
  }
};
