import type { NextApiRequest, NextApiResponse } from "next";
import Welcome from '../Welcome'; // Adjust the path as necessary
import { resend } from "../../lib/resend";
require('dotenv').config();

// Handler for GET method
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("Sending email...");
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "pateldiya873@gmail.com",
      subject: "Welcome to our app!",
      react: Welcome(),
    });
    console.log("Email sent successfully");
    return res.status(200).json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}

// Handler for POST method (example, adjust as needed)
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Implement POST method logic here
    return res.status(200).json({ message: 'POST method handled' });
  } catch (error) {
    console.error('Error handling POST method:', error);
    return res.status(500).json({ message: 'Failed to handle POST method' });
  }
}
