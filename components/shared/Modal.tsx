'use client';
import React, { useEffect } from 'react';
import { daysSincePosted } from '@/lib/actions/datePosted'; // Adjust the path as necessary
import { createOrder } from '@/lib/actions/order.actions'; // Adjust the path as necessary

interface Book {
  _id: string;
  title: string;
  postedAt: Date;
  price: string;
  imageURLs: string[];
  bookOwner: {
    _id: string;
    username: string;
  };
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  userId: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, books, userId }) => {
  if (!isOpen) return null;

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
        onClose();
      } else {
        console.error('Failed to create order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-xl shadow-lg z-10 transform hover:shadow-xl transition duration-200 ease-in-out">
        {books.map((book) => (
          <div key={book._id} className="flex flex-col md:flex-row items-center md:space-x-4 mb-6">
            <img
              src={book.imageURLs?.[0] || '/assets/images/book-admin.png'}
              alt="Book Cover"
              className="w-24 h-28 md:w-20 md:h-24"
            />
            <div className="flex-grow">
              <h4 className="text-lg font-semibold">
                {book.title} has been more than {book.postedAt ? daysSincePosted(book.postedAt) : 'N/A'} days old. Has it been sold?
              </h4>
              <p>Posted by: {book.bookOwner?.username || 'N/A'}</p>
              <p>Date: {book.postedAt ? new Date(book.postedAt).toLocaleDateString() : 'N/A'}</p>
              <p>Price: ${book.price || 'N/A'}</p>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
                onClick={() => handleSold(book._id, book.bookOwner._id, book.price)}
              >
                Sold
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                onClick={onClose}
              >
                Not sold
              </button>
            </div>
          </div>
        ))}
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
