'use server'

import { revalidatePath } from 'next/cache'


import { CreateUserParams, UpdateUserParams } from '@/types'
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
}import ipinfo from 'ipinfo'

export const getUserLocation = async (ip: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    ipinfo(ip, (err, cLoc) => {
      if (err) {
        reject(err);
      } else {
        resolve(cLoc.city);
      }
    });
  });
};

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
    await connectToDatabase();

    const user = await User.findById(userId);

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
export async function updateUserLocation(userId: string, ip: string, path: string) {
  try {
    await connectToDatabase();
 
    // Get the user's location
    const location = await getUserLocation(ip);
   
 
    // Update the user's location in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { location },
      { new: true }
    );
 
    if (!updatedUser) throw new Error('User update failed');
 
    revalidatePath(path);
 
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}
 