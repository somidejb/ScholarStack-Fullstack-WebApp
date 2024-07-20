import type { NextApiRequest, NextApiResponse } from 'next';
import { getTotalUsers } from '../../../lib/actions/user.actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userCount = await getTotalUsers();
    res.status(200).json({ totalUsers: userCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user count' });
  }
}
