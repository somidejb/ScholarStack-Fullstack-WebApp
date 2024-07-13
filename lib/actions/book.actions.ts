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
    .populate({ path: 'language', model: Language, select: '_id name' });
};
  
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

  const priceMappings = {
    'Free': { min: 0, max: 0 },
    '$5 - $10': { min: 5, max: 10 },
    '$10 - $25': { min: 10.01, max: 25 },
    '$25 - $50': { min: 25.01, max: 50 },
    'Above $50': { min: 50.01, max: Infinity }
  };
  export async function getAllBooks({ query, limit = 10, page = 1, category, language, price }: GetAllBooksParams) {
    try {
      await connectToDatabase();
 
      const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {};
      const filterConditions: any = {};
  
      if (category) {
        const categories = category.split('_with_');
        const categoryIds = await Promise.all(categories.map(cat => getCategoryByName(cat)));
        filterConditions.category = { $in: categoryIds.map(cat => cat?._id) };
      }
  
      if (language) {
        const languages = language.split('_with_');
        const languageIds = await Promise.all(languages.map(lang => getLanguageByName(lang)));
        filterConditions.language = { $in: languageIds.map(lang => lang?._id) };
      }
  
      if (price) {
        const priceRanges = price.split('_with_').map(label => priceMappings[label as keyof typeof priceMappings]);
  
        const priceConditions = priceRanges.map(range => ({
          $or: [
            { salePrice: { $gte: range.min, $lte: range.max } },
            { $and: [{ salePrice: '' }, { price: { $gte: range.min, $lte: range.max } }] }
          ]
        }));
  
        filterConditions.$and = [{ $or: priceConditions }];
      }
  
      const conditions = {
        $and: [titleCondition, filterConditions],
      };
  
  
      const skipAmount = (Number(page) - 1) * limit;
      const booksQuery = Book.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit);
 
      const books = await populateBook(booksQuery);
      const booksCount = await Book.countDocuments(conditions);
      const isNext = (page * limit) < booksCount;
  
      return {
        data: JSON.parse(JSON.stringify(books)),
        totalPages: Math.ceil(booksCount / limit),
        isNext,
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
  } catch (error) {
    handleError(error);
  }
}
 
export async function addFavorite(userId: string, bookId: string) {
  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    console.log(user)
    if (!user) throw new Error('User not found');

    if (!user.favorites.includes(bookId)) {
      user.favorites.push(bookId);
      await user.save();
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(`Error adding favorite for user ${userId} and book ${bookId}:`, error);
    throw error; // Rethrow the error to be handled by the calling function
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
export async function fetchBookById(id: string) {
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
 