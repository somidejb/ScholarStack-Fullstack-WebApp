'use server'

import { revalidatePath } from 'next/cache'


import { CreateUserParams, UpdateUserParams} from '@/types'
import User from '../mongodb/database/models/user.model'
import { connectToDatabase } from '../mongodb/database'
import { handleError } from '@/lib/utils';
import { clerkClient } from "@clerk/nextjs/server";

export async function createUser(clerkUser: any) {
  try {
    await connectToDatabase();
    
    const newUser = await User.create({
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      username: clerkUser.username || `user${clerkUser.id.slice(-6)}`, // Fallback if username is not provided
      firstName: clerkUser.firstName || '',
      lastName: clerkUser.lastName || '',
      photo: clerkUser.imageUrl || 'default_photo_url', // Provide a default photo URL
      // You can set bio and location later when the user provides them
    });
    
    return newUser;
  } catch (error) {
    handleError(error);
  }
}

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

  export async function getUserById(clerkId: string) {
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

  
  