import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const sendEmail = async (email: string, bookTitle: string) => {
  try {
    if (!email) {
      throw new Error('Email not found');
    }

    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    } as SMTPTransport.Options);

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Book Listing Reminder',
      text: `Your book "${bookTitle}" has been listed for 7 days. Has it been sold? If not, kindly log in to your dashboard to extend the listing.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
