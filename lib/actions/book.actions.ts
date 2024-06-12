'use server'

import { revalidatePath } from 'next/cache'

import { handleError } from '@/lib/utils'
import Category from '../mongodb/database/models/category.model'
import { connectToDatabase } from '../mongodb/database'
import { CreateBookParams, DeleteBookParams, UpdateBookParams } from '@/types'
import User from '../mongodb/database/models/user.model'
import Book from '../mongodb/database/models/book.model'
import Language from '../mongodb/database/models/language.model'

const getCategoryByName = async (name: string) => {
    return Category.findOne({ name: { $regex: name, $options: 'i' } })
}
  
export async function createBook({ userId, book, path }: CreateBookParams) {
    try {
      await connectToDatabase()
  
      const owner = await User.findById(userId)
      if (!owner) throw new Error('Book Owner not found')
  
      const newBook = await Book.create({ ...book, category: book.categoryId, language: book.languageId, bookOwner: userId })
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(newBook))
    } catch (error) {
      handleError(error)
    }
  }
  const populateBook = (query: any) => {
    return query
      .populate({ path: 'bookOwner', model: User, select: '_id firstName lastName' })
      .populate({ path: 'category', model: Category, select: '_id name' })
      .populate({ path: 'language', model: Language, select: '_id name' })
  }
  
  export async function getBookById(bookId: string) {
    try {
      await connectToDatabase()
  
      const book = await populateBook(Book.findById(bookId))
  
      if (!book) throw new Error('Event not found')
  
      return JSON.parse(JSON.stringify(book))
    } catch (error) {
      handleError(error)
    }
  }

export async function updateBook({ userId, book, path }: UpdateBookParams) {
    try {
      await connectToDatabase()
  
      const bookToUpdate = await Book.findById(book._id)
      if (!bookToUpdate || bookToUpdate.bookOwner.toHexString() !== userId) {
        throw new Error('Unauthorized or book not found')
      }
  
      const updatedBook = await Book.findByIdAndUpdate(
        book._id,
        { ...book, category: book.categoryId , language: book.languageId},
        { new: true }
      )
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(updatedBook))
    } catch (error) {
      handleError(error)
    }
  }

export async function deleteBook({ bookId, path }: DeleteBookParams) {
    try {
      await connectToDatabase()
  
      const deletedBook = await Book.findByIdAndDelete(bookId)
      if (deletedBook) revalidatePath(path)
    } catch (error) {
      handleError(error)
    }
  }


  export async function fetchAllBooks() {
    try {
        await connectToDatabase()
        
        const books = await populateBook(Book.find({})).lean()
        return JSON.parse(JSON.stringify(books))
    } catch (error) {
        handleError(error)
        return []
    }
}