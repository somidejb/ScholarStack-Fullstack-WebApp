'use client';

import React, { useEffect } from 'react';
import { daysSincePosted } from '@/lib/actions/datePosted'; // Adjust the path as necessary
import { createOrder } from '@/lib/actions/order.actions'; // Adjust the path as necessary
import { deleteBook } from '@/lib/actions/book.actions'; // Ensure this path is correct
import { IBook } from '@/lib/mongodb/database/models/book.model';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: IBook[];
  userId: string;
  handleNotSold: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, books, userId, handleNotSold }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSold = async (bookId: string, sellerId: string, price: string) => {
    try {
      const order = {
        order: `ORD-${Date.now()}`,
        seller: sellerId,
        buyer: userId,
        book: bookId,
        price: parseFloat(price),
        orderDate: new Date(),
      };

      const newOrder = await createOrder({ userId, order, path: '/path-to-revalidate' });

      if (newOrder) {
        await deleteBook({ bookId, path: '/path-to-revalidate' });
        onClose();
      } else {
        console.error('Failed to create order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-xl shadow-lg z-10 transform hover:shadow-xl transition duration-200 ease-in-out">
        {books.map((book) => {
          const daysPosted = book.postedAt ? daysSincePosted(book.postedAt) : 0;
          return (
            <div key={book._id} className="flex flex-col md:flex-row items-center md:space-x-4 mb-6">
              <img
                src={book.imageURLs?.[0] || '/assets/images/book-admin.png'}
                alt="Book Cover"
                className="w-24 h-28 md:w-20 md:h-24"
              />
              <div className="flex-grow">
                <h4 className="text-lg font-semibold">
                  {book.title} has been more than {daysPosted} days old. Has it been sold?
                </h4>
                <p>Posted by: {book.bookOwner?.username || 'N/A'}</p>
                <p>Date: {book.postedAt ? new Date(book.postedAt).toLocaleDateString() : 'N/A'}</p>
                <p>Price: ${book.price || 'N/A'}</p>
              </div>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => {
                    if (book.price) {
                      handleSold(book._id, book.bookOwner._id, book.price);
                    } else {
                      console.error('Price is undefined');
                    }
                  }}
                >
                  Sold
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  onClick={handleNotSold}
                >
                  Not sold
                </button>
              </div>
            </div>
          );
        })}
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
