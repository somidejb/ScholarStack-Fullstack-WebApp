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
// import { NextRequest, NextResponse } from 'next/server';
// import { getUserById, updateUser } from '@/lib/actions/user.actions'; // Adjust the path as needed
// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const userId = searchParams.get('userId');

//   if (!userId) {
//     return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
//   }

//   try {
//     const userProfile = await getUserById(userId);
//     if (!userProfile) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }
//     return NextResponse.json(userProfile, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: 'Failed to fetch profile data' }, { status: 500 });
//   }
// }

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const { userId, updatedProfile } = body;

//   if (!userId || !updatedProfile) {
//     return NextResponse.json({ message: 'User ID and updated profile are required' }, { status: 400 });
//   }

//   try {
//     const updatedUser = await updateUser(userId, updatedProfile, '/api/users/get-profile');
//     return NextResponse.json(updatedUser, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: 'Failed to update profile' }, { status: 500 });
//   }
// }