import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb/database';
import User from '@/lib/mongodb/database/models/user.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    const users = await User.find({}).sort({ joinedAt: -1 }); // Adjust the query as needed
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
