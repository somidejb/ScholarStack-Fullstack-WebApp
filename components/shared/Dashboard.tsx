
"use client";
import React, { useState } from 'react';
import BookCardAdmin from './BookCardAdmin';
import { IAdminBooks } from '@/lib/mongodb/database/models/adminbooks.model';
import { createBook, deleteBook } from '@/lib/actions/book.actions';
import { deleteAdminBook } from '@/lib/actions/admin.action';

interface DashboardProps {
  books:{
    _id: string;
    title: string;
    author: string;
    description: string;
    postedAt: Date;
    imageURLs: string[];
    category: {_id: string};
    language: {_id: string};
    isBookFree?: boolean;
    price?: string;
    salePrice?: string;
    location: string;
    bookOwner: {
      _id: string, firstName: string, lastName:string, photo: string
    };
  }[];
  path: string;
  totalSubs: string | undefined;
}

const Dashboard = ({ books, path, totalSubs } : DashboardProps) => {
  const [bookList, setBookList] = useState(books.map(book => ({ ...book})));
  console.log("Book List: ", bookList);
  const [removingBook, setRemovingBook] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const transformedBookList = bookList.map(book => ({
    title: book.title,
    author: book.author,
    description: book.description,
    postedAt: book.postedAt,
    imageURLs: book.imageURLs,
    categoryId: book.category._id,
    languageId: book.language._id,
    isFree: book.isBookFree,
    price: book.price,
    salePrice: book.salePrice,
    location: book.location,
  }));
  console.log("Transformed Book List: ", transformedBookList);
  
  const handleApprove = async(index: number) => {
    const newBook = await createBook({
      userId : bookList[index].bookOwner._id,
      book: { ...transformedBookList[index]},
      path,
      page: 'not admin',
      bookId: bookList[index]._id
    });
    setRemovingBook(index);
    setBookList(prevBooks => {
      const newBooks = [...prevBooks];
      return newBooks;
    });
    setTimeout(() => {
      setBookList(prevBooks => prevBooks.filter((_, i) => i !== index));
      setRemovingBook(null);
    }, 500); 
  };

  const handleReject = async(index: number) => {
    const deletedBook = await deleteBook({
      bookId: bookList[index]._id,
      path,
      page: 'admin'
    });
    console.log("Deleted Book: ", deletedBook);
    setRemovingBook(index);
    setBookList(prevBooks => {
      const newBooks = [...prevBooks];
      return newBooks;
    });
    setTimeout(() => {
      setBookList(prevBooks => prevBooks.filter((_, i) => i !== index));
      setRemovingBook(null);
    }, 500); 
  };

  const filteredBooks = bookList.filter(book =>
    (book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  return (
    <div className="p-6 md:p-4">
      <div className="mb-6 md:mb-4 w-full">
        <input
          type="text"
          placeholder="Search by title or posted by..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-5 py-2.5 border shadow-md rounded-2xl bg-white outline-none hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="bg-blue-900 text-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
          <h2 className="text-center">Total Subscriptions</h2>
          <p className="text-4xl text-center">{totalSubs}</p>
        </div>
        <div className="bg-gray-400 text-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
          <h2 className="text-center">Pending</h2>
          <p className="text-4xl text-center">{bookList.length}</p>
        </div>
      </div>
      <div className="space-y-6 md:space-y-4">
        {filteredBooks.map((book, index) => (
          <div key={index} className={`mb-6 ${removingBook === index ? 'transform translate-x-full opacity-0 transition duration-500 ease-out' : ''}`}>
            <BookCardAdmin
              book={book}
              onApprove={() => handleApprove(index)}
              onReject={() => handleReject(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

