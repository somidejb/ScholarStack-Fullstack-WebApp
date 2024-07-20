'use server'

import { revalidatePath } from 'next/cache'
import { handleError } from '@/lib/utils'
import { CreateUserParams, UpdateUserParams } from '@/types'
import User from '../mongodb/database/models/user.model'
import { connectToDatabase } from '../mongodb/database'

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

export async function getTotalUsers() {
  try {
    await connectToDatabase()
    const userCount = await User.countDocuments()
    return userCount
  } catch (error) {
    handleError(error)
  }
}
