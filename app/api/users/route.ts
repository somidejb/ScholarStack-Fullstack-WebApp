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