'use server';

import { revalidatePath } from 'next/cache';
import { CreateUserParams, DeleteUserParams, UpdateUserParams} from '@/types'
import User from '../mongodb/database/models/user.model';
import { connectToDatabase } from '../mongodb/database';
import Chat from '../mongodb/database/models/chat.model';
import Message from '../mongodb/database/models/message.model';
import { handleError } from '@/lib/utils';
import { clerkClient } from '@clerk/nextjs/server';
import { connect } from 'http2'
import ipinfo from 'ipinfo';
import Book from '../mongodb/database/models/book.model'

export async function updateUser(userId: string, updatedProfile: any) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        username: updatedProfile.username,
        bio: updatedProfile.bio,
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
    await connectToDatabase();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(params: DeleteUserParams){
  try{
    connectToDatabase();
    const {clerkId} = params;

    const user = await User.findOneAndDelete({clerkId});

    if(!user) throw new Error('User not found');

    const userBookIds = await Book.find({bookOwner: user._id}).distinct('_id');
    await Book.deleteMany({bookOwner: user._id});

    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  }
  catch(error){
    handleError(error);
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId });

    if (!user) {
      console.error('User not found');
      throw new Error('User not found');
    }

    return user; // Returning the user document which includes the _id field
  } catch (error) {
    console.error('Error fetching user by clerkId:', error);
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
        path: 'members',
        model: User,
      })
      .populate({
        path: 'messages',
        model: Message,
        populate: { path: 'sender seenBy', model: User },
      })
      .exec();

    if (!allChats) throw new Error('Chats not found');
    return JSON.parse(JSON.stringify(allChats));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUserLocation(clerkId: string, ip: string, path: string) {
  try {
    await connectToDatabase();

    // Get the user's location
    const location = await getUserLocation(ip);

    // Update the user's location in the database
    const updatedUser = await User.findOneAndUpdate(
      { clerkId },
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

export async function countAllUsers() {
  try {
    await connectToDatabase();
    const count = await User.countDocuments();
    return String(count);
  } catch (error) {
    handleError(error);
  }
}

export async function addFavorite(clerkId: string, bookId: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId });
    if (!user) throw new Error('User not found');

    if (!user.favorites.includes(bookId)) {
      user.favorites.push(bookId);
      await user.save();
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(`Error adding favorite for user ${clerkId} and book ${bookId}:`, error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}

export async function removeFavorite(clerkId: string, bookId: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId });
    if (!user) throw new Error('User not found');

    user.favorites.pull(bookId);
    await user.save();

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
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

export async function isUserOnline(clerkId: string): Promise<boolean> {
  try {
    const sessionListResponse = await clerkClient.sessions.getSessionList({ userId: clerkId });

    const sessions = sessionListResponse.data;

    const activeSessions = sessions.some(session => session.status === 'active');

    return activeSessions;
  } catch (error) {
    console.error('Error checking user online status:', error);
    return false; // Return false if there's an error
  }
}
 