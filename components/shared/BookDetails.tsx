"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';
import { getChats } from '@/lib/actions/chat.actions';
import { fetchBooksByCategory } from '@/lib/actions/book.actions';
import { IBook } from '@/lib/mongodb/database/models/book.model';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import ImageModal from './ImageModal'; // Adjust the import path as necessary
import { Collection } from '@/components/shared/Collection';
import { addFavorite, removeFavorite } from '@/lib/actions/book.actions';

type Book = {
  _id: string;
  title: string;
  author: string;
  description: string;
  images: string[];
  price: string;
  salePrice?: string;
  location: string; // Add the 'location' property
};

type BookDetailsProps = {
  book: IBook;
  userId: string;
  bookOwner: string;
  favorites: string[];
};

const BookDetails: React.FC<BookDetailsProps> = ({ book, userId, bookOwner, favorites }) => {
  const [favorite, setFavorite] = useState(favorites?.includes(book?._id));
  console.log("userID:", userId, "bookId:", bookOwner);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [similarBooks, setSimilarBooks] = useState<IBook[]>([]);
  const router = useRouter();

  const hasImages = book.imageURLs && book.imageURLs.length > 0;

  useEffect(() => {
    setFavorite(favorites?.includes(book?._id));
  }, [favorites, book?._id]);

  const toggleFavorite = async () => {
    if (favorite) {
      await removeFavorite(userId, book?._id);
    } else {
      await addFavorite(userId, book?._id);
    }
    setFavorite(!favorite);
  };

  const members: string[] = [bookOwner];

  useEffect(() => {
    const fetchSimilarBooks = async () => {
      if (book.category && typeof book.category === 'object' && '_id' in book.category) {
        const books = await fetchBooksByCategory(book.category._id);
        setSimilarBooks(books);
      } else if (typeof book.category === 'string') {
        const books = await fetchBooksByCategory(book.category);
        setSimilarBooks(books);
      }
    };
  
    fetchSimilarBooks();
  }, [book.category]);
  
  const createChat = async () => {
    const chat = await getChats({ userId, members: [bookOwner] });
    if (chat) {
      router.push(`/chats`);
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const navigateBack = () => {
    window.history.back(); // Navigate back using browser history
  };

  return (
    <motion.div
      className="p-2 lg:p-10 lg:mt-2 lg:ml-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-sans">
        <motion.button onClick={navigateBack} className="flex items-center text-indigo-900 left-5 hover:big mb-4">
          <Image
            src="/assets/icons/back.svg"
            alt="Go Back"
            width={15}
            height={20}
            className="mr-2"
          />
          Back to Search
        </motion.button>
        <div className="flex flex-col lg:flex-row items-start justify-start mb-10">
          <div className="w-full sm:justify-evenly lg:w-auto flex justify-center lg:justify-start mb-5 lg:mb-0">
            <motion.div
              className="transition-transform duration-300 ease-in-out transform hover:scale-110 space-x-2 mr-2 mb-2 border border-gray-300 rounded shadow-2xl w-[150px] h-[200px] sm:w-[180px] sm:h-[240px] md:w-[290px] md:h-[400px] lg:w-[370px] lg:h-[500px] xl:w-[446px] xl:h-[600px] relative"
              whileHover={{ scale: 1.05 }}
            >
              {hasImages ? (
                <Image
                  src={book.imageURLs[0]}
                  alt={book.title}
                  layout="fill"
                  objectFit="cover"
                  className="mb-2 cursor-pointer rounded"
                  onClick={() => handleImageClick(0)}
                />
              ) : (
                <div className="w-[150px] h-[200px] sm:w-[180px] sm:h-[240px] md:w-[290px] md:h-[400px] lg:w-[370px] lg:h-[500px] xl:w-[446px] xl:h-[600px] mb-2 bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}
            </motion.div>
          </div>
          <div className="flex flex-col lg:flex-row items-start justify-start w-full lg:w-auto">
            <div className="flex flex-row lg:flex-col justify-start items-center space-x-2 lg:space-x-0 lg:space-y-2 mt-0 lg:mt-0 lg:ml-5">
              {hasImages &&
                book.imageURLs.slice(1).map((imageUrl, index) => (
                  <motion.div
                    key={index}
                    className="relative w-[70px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[150px]"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Image
                      src={imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="cursor-pointer p-2 flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 border border-gray-300 rounded shadow-lg"
                      onClick={() => handleImageClick(index + 1)}
                    />
                  </motion.div>
                ))}
            </div>
            <motion.div
              className="flex flex-col lg:justify-start lg:space-x-0 lg:space-y-2 lg:mt-0 lg:ml-5 max-w-lg text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-0">{book.title}</h1>
              <p className="text-lg sm:text-lg md:text-xl lg:text-xl mb-5 lg:mb-20">Author: {book.author}</p>
              <p className="text-xl sm:text-lg md:text-2xl lg:text-2xl font-semibold sm:mb-5 lg:mb-0">Actual price: ${book.price}</p>
              {book.salePrice && (
                <p className="text-xl md:text-xl text-indigo-900 lg:text-2xl font-semibold">Sale price: ${book.salePrice}</p>
              )}
              <p className="text-lg text-indigo-900 md:text-2xl lg:text-xl mb-5 lg:mb-4">{book.description}</p>
              <div className="flex items-center mb-2 lg:mb-10">
                <FaMapMarkerAlt className="mr-2 text-indigo-900" size={20} />
                <span className="text-base md:text-xl lg:text-xl">{book.location}</span>
              </div>
              <div className="mt-10 flex space-x-5 md:space-x-10">
                <motion.button
                  onClick={createChat}
                  className="transition-transform duration-300 ease-in-out transform hover:scale-110 bg-indigo-900 text-sm hover:bg-indigo-700 hover:text-gray-200 hover:shadow-lg lg:text-xl text-white px-5 py-2 lg:px-10 lg:py-2 rounded-lg shadow-md"
                  whileHover={{ scale: 1.05 }}
                >
                  Message Seller
                </motion.button>
                <motion.button
                  className="transition-transform duration-300 ease-in-out transform hover:scale-110 border border-indigo-900 text-sm lg:text-xl text-indigo-900 px-10 py-2 lg:px-14 lg:py-2 relative rounded-lg shadow-md hover:bg-indigo-200 hover:text-indigo-900 hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  Favorite
                  <Image
                    src={favorite ? "/assets/icons/favorite-red.png" : "/assets/icons/favorite.svg"} 
                    alt="heart"
                    width={19}
                    height={11}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 object-contain w-[12px] md:w-[20px] xl:w-[24px] h-full"
                    onClick={toggleFavorite}
                  />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {selectedImageIndex !== null && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          images={book.imageURLs}
          selectedIndex={selectedImageIndex}
          onSelect={setSelectedImageIndex}
        />
      )}
      {similarBooks.length > 0 && (
        <div className="text-lg text-gray-600 mt-10">
          <Collection collection_type="Similar to this..." books={similarBooks} userId={userId} />
        </div>
      )}
    </motion.div>
  );
};

export default BookDetails;
