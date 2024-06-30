'use server'

import { revalidatePath } from 'next/cache'
import { handleError } from '@/lib/utils'

import { CreateUserParams, UpdateUserParams} from '@/types'
import User from '../mongodb/database/models/user.model'
import { connectToDatabase } from '../mongodb/database'
import Chat from '../mongodb/database/models/chat.model'

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase()

    const newUser = await User.create(user)
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    handleError(error)
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams, path: string) {
    try {
      await connectToDatabase()
  
      const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })
  
      if (!updatedUser) throw new Error('User update failed');
      
      revalidatePath(path);
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

export async function getChatsById(userId: string) {
  try {
    await connectToDatabase();

    const allChats = await Chat.find({ members: userId })
    .sort({ lastMessageAt: -1 })
    .populate({
      path: "members",
      model: User,
    }).exec();

    if (!allChats) throw new Error('Chats not found');

    return JSON.parse(JSON.stringify(allChats));
  }
  catch(error){
    handleError(error);
  }
}
