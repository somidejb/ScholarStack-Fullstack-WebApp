import React, { useEffect, useState } from 'react';
import { getUserById } from '@/lib/actions/user.actions';
import { format } from 'date-fns';

interface BookCardAdminProps {
  book: {
    _id: string;
    title: string;
    author: string;
    description: string;
    postedAt: Date | string;
    imageURLs: string[];
    categoryId: string;
    languageId: string;
    isFree?: boolean;
    price?: string;
    salePrice?: string;
    location: string;
    bookOwner: {
      _id: string;
      firstName: string;
      lastName: string;
      photo: string;
    };
  };
  onApprove: () => void;
  onReject: () => void;
  className?: string;
}

interface User {
  firstName: string;
  lastName: string;
  photo: string;
}

const BookCardAdmin = ({ book, onApprove, onReject, className }: BookCardAdminProps) => {
  const [uploadedUser, setUploadedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(book.bookOwner._id);
        setUploadedUser(user);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchUser();
  }, [book.bookOwner._id]);

  const formatDate = (date: Date | string): string => {
    const validDate = typeof date === 'string' ? new Date(date) : date;
    return format(validDate, 'MM/dd/yyyy');
  };

  return (
    <div className={`p-6 rounded-xl shadow-md flex flex-col space-y-4 hover:shadow-lg transform transition duration-200 ease-in-out ${className}`}>
      <div className="flex flex-col md:flex-row items-center md:space-x-4">
        <img
          src={book.imageURLs[0]}
          alt="Book Cover"
          className="w-24 h-28 md:w-20 md:h-24"
        />
        <div className="flex-grow">
          <h4 className="text-lg font-semibold">Title: {book.title}</h4>
          {uploadedUser ? (
            <p>Posted by: {uploadedUser.firstName} {uploadedUser.lastName}</p>
          ) : (
            <p>Loading user information...</p>
          )}
          <p>Date: {formatDate(book.postedAt)}</p>
          <p>Price: {book.price}</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button onClick={onApprove} className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Approve
          </button>
          <button onClick={onReject} className="bg-red-600 text-white px-4 py-2 rounded-lg">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCardAdmin;
