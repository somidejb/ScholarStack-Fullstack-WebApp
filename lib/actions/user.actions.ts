'use server'

import { revalidatePath } from 'next/cache'


import { CreateUserParams, UpdateUserParams} from '@/types'
import User from '../mongodb/database/models/user.model'
import { connectToDatabase } from '../mongodb/database'
import Chat from '../mongodb/database/models/chat.model'
import Message from '../mongodb/database/models/message.model'
import { handleError } from '@/lib/utils';
import { clerkClient } from "@clerk/nextjs/server";

export async function updateUser(userId: string, updatedProfile: any) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        username: updatedProfile.username,
        bio: updatedProfile.bio,
        location: updatedProfile.location,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  } catch (error) {
    handleError(error);
  }
}
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase()

    const newUser = await User.create(user)
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    handleError(error)
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase()

    const user = await User.findById(userId)

    if (!user) throw new Error('User not found')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    handleError(error)
  }
}

export async function getUserById2(clerkId: string) {
  try {
    await connectToDatabase();
    
    const user = await User.findOne({ clerkId });
    
    if (!user) throw new Error('User not found');
    
    return user;
  } catch (error) {
    handleError(error);
  }
}

export async function updateUserInClerkAndDB(userId: string, clerkId: string, updatedProfile: any) {
  try {
    // Update user in MongoDB
    const updatedUser = await updateUser(userId, updatedProfile);

    // Update user in Clerk
    await clerkClient.users.updateUser(clerkId, {
      firstName: updatedProfile.firstName,
      lastName: updatedProfile.lastName,
      username: updatedProfile.username,
    });

    return updatedUser;
  } catch (error) {
    handleError(error);
  }
}

export async function getChatsById(userId: string) {
  try {
    await connectToDatabase();

    const allChats = await Chat.find({ members: userId })
    .sort({ lastMessageAt: -1 })
    .populate({
      path: "members",
      model: User,
    }).populate({
      path: "messages",
      model: Message,
      populate: {path: "sender seenBy", model: User}}).exec();

    if (!allChats) throw new Error('Chats not found');
    console.log(allChats);
    return JSON.parse(JSON.stringify(allChats));

  }
  catch(error){
    handleError(error);
  }
}

export async function getMonthlyUserStats() {
  try {
    await connectToDatabase();

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    const users = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          userCount: { $sum: 1 }
        },
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    // Convert to required format
    return users.map(entry => ({
      date: entry._id,
      userCount: entry.userCount
    }));

  } catch (error) {
    handleError(error);
  }
}


export async function getUsersByJoinDate(startDate: Date, endDate: Date) {
  try {
    await connectToDatabase();
    const users = await User.find({
      joinedAt: { $gte: startDate, $lte: endDate }
    }).sort({ joinedAt: 1 }); // Sort by joinedAt date
    console.log("users from grtUser: ", users)
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}