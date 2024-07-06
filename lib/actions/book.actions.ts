'use server'

import { revalidatePath } from 'next/cache'

import { handleError } from '@/lib/utils'
import Category from '../mongodb/database/models/category.model'
import { connectToDatabase } from '../mongodb/database'
import { CreateBookParams, DeleteBookParams, GetAllBooksParams, UpdateBookParams } from '@/types'
import User from '../mongodb/database/models/user.model'
import Book from '../mongodb/database/models/book.model'
import Language from '../mongodb/database/models/language.model'
import { title } from 'process'

const getCategoryByName = async (name: string) => {
    return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

const getLanguageByName = async (name: string) => {
    return Language.findOne({ name: { $regex: name, $options: 'i' } })
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

  export async function getAllBooks({ query, limit = 10, page = 1, category, language }: GetAllBooksParams) {
    try {
      await connectToDatabase();
  
      const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {};
      const categoryCondition = category ? { category: (await getCategoryByName(category))?._id } : {};
      const languageCondition = language ? { language: (await getLanguageByName(language))?._id } : {};
  
      const conditions = {
        $and: [titleCondition, categoryCondition, languageCondition],
      };
  
      const skipAmount = (Number(page) - 1) * limit;
      const booksQuery = Book.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit);
  
      const books = await populateBook(booksQuery);
      const booksCount = await Book.countDocuments(conditions);
  
      return {
        data: JSON.parse(JSON.stringify(books)),
        totalPages: Math.ceil(booksCount / limit),
      };
    } catch (error) {
      handleError(error);
    }
  }
  
export async function getFavorites(userId: string) {
  try {
    await connectToDatabase();
    const user = await User.findById(userId).populate('favorites');
    if (!user) throw new Error('User not found');

    return JSON.parse(JSON.stringify(user.favorites));
    console.log(user.favorites)
  } catch (error) {
    handleError(error);
  }
}

export async function addFavorite(userId: string, bookId: string) {
  try {
    await connectToDatabase()
    const user = await User.findById(userId)
    if (!user) throw new Error('User not found')

    if (!user.favorites.includes(bookId)) {
      user.favorites.push(bookId)
      await user.save()
    }

    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    handleError(error)
  }
}

export async function removeFavorite(userId: string, bookId: string) {
  try {
    await connectToDatabase()
    const user = await User.findById(userId)
    if (!user) throw new Error('User not found')

    user.favorites.pull(bookId)
    await user.save()

    return JSON.parse(JSON.stringify(user))
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
export const fetchBookById = async (id: string) => {
  try {
    await connectToDatabase();
    const book = await Book.findById(id).lean();
    return JSON.parse(JSON.stringify(book));
  } catch (error) {
    handleError(error);
    return null;
  }
  
}
export async function fetchBooksByCategory(categoryId: string) {
  try {
    await connectToDatabase();
    const books = await populateBook(Book.find({ category: categoryId }));
    return JSON.parse(JSON.stringify(books));
  } catch (error) {
    handleError(error);
    return [];
  }
};





