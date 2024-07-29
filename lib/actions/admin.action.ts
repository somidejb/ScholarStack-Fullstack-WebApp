import { revalidatePath } from "next/cache"
import { connectToDatabase } from "../mongodb/database"
import AdminBooks from "../mongodb/database/models/adminbooks.model"
import User from "../mongodb/database/models/user.model"
import { handleError } from "../utils"
import { CreateBookParams, DeleteBookParams, UpdateBookParams } from "@/types"
import Book from "../mongodb/database/models/book.model"
import Language from "../mongodb/database/models/language.model"
import Category from "../mongodb/database/models/category.model"


const populateBook = (query: any) => {
    return query
      .populate({ path: 'bookOwner', model: User, select: '_id firstName lastName' })
      .populate({ path: 'category', model: Category, select: '_id name' })
      .populate({ path: 'language', model: Language, select: '_id name' });
  };

export async function createAdminBook({ userId, book, path }: CreateBookParams) {
    try {
      await connectToDatabase()
 
      const owner = await User.findById(userId)
      if (!owner) throw new Error('Book Owner not found')
 
      const newBook = await AdminBooks.create({ ...book, category: book?.categoryId, language: book?.languageId, bookOwner: userId })
      revalidatePath(path)
 
      return JSON.parse(JSON.stringify(newBook))
    } catch (error) {
      handleError(error)
    }
}

export async function updateAdminBook({ userId, book, path }: UpdateBookParams) {
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

  export const fetchAllBooksAdmin = async () => {
    try {
      await connectToDatabase()
     
      const books = await populateBook(AdminBooks.find({})).lean()
      return JSON.parse(JSON.stringify(books))
    } 
    catch (error) {
      handleError(error)
      return []
    }
  };

  export async function deleteAdminBook({ bookId, path }: DeleteBookParams) {
    try {
      await connectToDatabase()
 
      const deletedBook = await AdminBooks.findByIdAndDelete(bookId)
      if (deletedBook) revalidatePath(path)
    } catch (error) {
      handleError(error)
    }
  }