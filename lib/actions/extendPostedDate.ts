import { sendEmail } from './email';
import { daysSincePosted } from '@/lib/actions/datePosted';

export const handleBookNotification = async (book: any, email: string) => {
  // Calculate the number of days since the book was posted
  const daysPosted = daysSincePosted(book.postedAt);

  if (daysPosted % 7 === 0) {
    try {
      console.log(`Sending email to: ${email}`);
      await sendEmail(email, book.title);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
};
