// pages/api/users/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import User from "@/lib/mongodb/database/models/user.model";
import { connectToDatabase } from "@/lib/mongodb/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            await connectToDatabase();
            const allUsers = await User.find();
            res.status(200).json(allUsers);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch all users" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
