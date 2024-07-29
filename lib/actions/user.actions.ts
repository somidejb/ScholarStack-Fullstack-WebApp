'use server'

import { revalidatePath } from 'next/cache'
import { handleError } from '@/lib/utils'
import { CreateUserParams, UpdateUserParams, DeleteUserParams } from '@/types'
import User from '../mongodb/database/models/user.model'
import { connectToDatabase } from '../mongodb/database'
import Chat from '../mongodb/database/models/chat.model'
import Message from '../mongodb/database/models/message.model'
import Book from '../mongodb/database/models/book.model'
import { clerkClient } from "@clerk/nextjs/server"

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

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
    throw error;  // rethrow error after handling it
  }
}

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
    throw error;  // rethrow error after handling it
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectToDatabase();
    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) throw new Error('User not found');

    const userBookIds = await Book.find({ bookOwner: user._id }).distinct('_id');
    await Book.deleteMany({ bookOwner: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);
    return JSON.parse(JSON.stringify(deletedUser));
  } catch (error) {
    handleError(error);
    throw error;  // rethrow error after handling it
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
    throw error;  // rethrow error after handling it
  }
}

export async function getUsersByUsername(username: string) {
  try {
    await connectToDatabase();

    const users = await User.find({ username: { $regex: username, $options: 'i' } }); // Case-insensitive search
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
    throw error;  // rethrow error after handling it
  }
}