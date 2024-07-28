
"use client";
import React, { useState } from 'react';
import BookCardAdmin from './BookCardAdmin';

interface DashboardProps {
  books: {
    title: string;
    postedBy: string;
    datePosted: string;
    price: string;
    bookImage: string;
  }[];
}

const Dashboard: React.FC<DashboardProps> = ({ books }) => {
  const [bookList, setBookList] = useState(books.map(book => ({ ...book, status: 'default' as 'approved' | 'rejected' | 'default' })));
  const [removingBook, setRemovingBook] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleApprove = (index: number) => {
    setRemovingBook(index);
    setBookList(prevBooks => {
      const newBooks = [...prevBooks];
      newBooks[index].status = 'approved';
      return newBooks;
    });
    setTimeout(() => {
      setBookList(prevBooks => prevBooks.filter((_, i) => i !== index));
      setRemovingBook(null);
    }, 500); 
  };

  const handleReject = (index: number) => {
    setRemovingBook(index);
    setBookList(prevBooks => {
      const newBooks = [...prevBooks];
      newBooks[index].status = 'rejected';
      return newBooks;
    });
    setTimeout(() => {
      setBookList(prevBooks => prevBooks.filter((_, i) => i !== index));
      setRemovingBook(null);
    }, 500); 
  };

  const filteredBooks = bookList.filter(book =>
    (book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
    (book.postedBy?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  return (
    <div className="p-6 md:p-4 ">
      <div className="mb-6 md:mb-4 w-full">
        <input
          type="text"
          placeholder="Search by title or posted by..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-5 py-2.5 border shadow-md rounded-2xl bg-white outline-none hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out w-full"
        />
      </div>
      <div className="space-y-6 md:space-y-4 gap-4 mb-10">
        <div className="bg-blue-900 text-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
          <h2 className="text-center">Total Subscriptions</h2>
          <p className="text-4xl text-center">125</p>
        </div>
        
      </div>
      <div className="space-y-6 md:space-y-4">
        {filteredBooks.map((book, index) => (
          <div key={index} className={`mb-6 ${removingBook === index ? 'transform translate-x-full opacity-0 transition duration-500 ease-out' : ''}`}>
            <BookCardAdmin
              title={book.title}
              postedBy={book.postedBy}
              date={book.datePosted}
              price={book.price}
              imageUrl={book.bookImage}
              status={book.status}
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

