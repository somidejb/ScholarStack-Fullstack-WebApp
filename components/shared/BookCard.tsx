"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiEye, FiMoreHorizontal, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { createOrder } from '@/lib/actions/order.actions';
import { deleteBook, addFavorite, addFavorite2, removeFavorite2, removeFavorite } from '@/lib/actions/book.actions';

type BookCardProps = {
  userId: string;
  bookId: string;
  title: string;
  imageUrl: string;
  author: string;
  price?: string;
  salePrice?: string;
  favorites?: string[];
  bookOwnerId: string;
  isProfilePage?: boolean;
  fewBooks?: boolean;
};

const BookCard = ({
  userId,
  bookId,
  title,
  imageUrl,
  author,
  price,
  salePrice,
  favorites,
  bookOwnerId,
  isProfilePage,
}: BookCardProps) => {
  const [favorite, setFavorite] = useState(favorites?.includes(bookId) ?? false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showSoldConfirmation, setShowSoldConfirmation] = useState(false);

  useEffect(() => {
    setFavorite(favorites?.includes(bookId) ?? false);
  }, [favorites, bookId]);
  const toggleFavorite = async () => {
    const profilePath = `/profile/${userId}`;
    if (favorite) {
      if (typeof window !== 'undefined' && window.location.pathname === profilePath) {
        await removeFavorite2(userId, bookId);
      } else {
        await removeFavorite(userId, bookId);
      }
    } else {
      if (typeof window !== 'undefined' && window.location.pathname === profilePath) {
        await addFavorite2(userId, bookId);
      } else {
        await addFavorite(userId, bookId);
      }
    }
    setFavorite(!favorite);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const scaleUp = {
    hidden: { scale: 0.8 },
    visible: { scale: 1 }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteBook({ bookId, path: `/profile/${userId}`, page: "not admin" });
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Failed to delete the book:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleMarkAsSoldClick = () => {
    setShowSoldConfirmation(true);
  };

  const handleConfirmSold = async () => {
    try {
      const order = {
        order: `ORD-${Date.now()}`,
        seller: bookOwnerId,
        buyer: userId,
        book: bookId,
        price: parseFloat(price || "0"),
        orderDate: new Date(),
      };

      const newOrder = await createOrder({ userId, order, path: "/path-to-revalidate" });

      if (newOrder) {
        await deleteBook({ bookId, path: "/path-to-revalidate", page: "not admin" });
        setShowSoldConfirmation(false);
      } else {
        console.error("Failed to create order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelSold = () => {
    setShowSoldConfirmation(false);
  };

  return (
    <motion.div 
      className={`relative rounded-[15px] w-full lg:rounded-[30px] flex ${
        isProfilePage && userId !== bookOwnerId ?
        "h-[180px] md:h-[230px] lg:h-[280px] xl:h-[350px]" :
        "h-[135px] md:h-[180px] lg:h-[230px] xl:h-[300px]"
      } lg:min-w-[170px] lg:max-w-[200px] xl:min-w-[220px] xl:max-w-[250px] min-w-[104px] md:min-w-[130px] md:max-w-[150px] flex-col card-shadow mb-1 max-md:max-w-[110px]`}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-start justify-center w-full h-full px-[7px] lg:px-[18px] xl:px-[25px] pt-[10px] md:pt-[13px] lg:pt-[25px]">
        <Link
          href={{
            pathname: `/books/${bookId}`,
            query: { favorite: favorite.toString() },
          }}
          className="rounded-[10px] w-full h-[90px] md:h-[120px] lg:h-[210px] xl:h-[300px] overflow-hidden flex-center book-shadow"
        >
          <motion.div variants={scaleUp}>
            <Image src={imageUrl} alt={title} width={216} height={301} className="object-contain" />
          </motion.div>
        </Link>
        <motion.p 
          className="pt-[3px] font-bold p-card overflow-hidden line-clamp-1"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.p>
        <motion.p 
          className="font-normal p-card line-clamp-1"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {author}
        </motion.p>
        <div className="flex justify-between w-full">
          <motion.div 
            className="flex p-card gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {salePrice ? (
              <>
                <p className="font-bold text-red-400">{`$ ${salePrice}`}</p>
                <p className="font-normal text-gray-400 line-through">{price === "0" ? "Free" : `$ ${price}`}</p>
              </>
            ) : (
              <p className="font-bold">{price === "0" ? "Free" : `$ ${price}`}</p>
            )}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Image
              src={favorite ? "/assets/icons/favorite-red.png" : "/assets/icons/favorite.svg"}
              alt="heart"
              width={19}
              height={11}
              className="object-contain w-[12px] md:w-[20px] lg:w-[24px] h-full cursor-pointer"
              onClick={toggleFavorite}
            />
          </motion.div>
        </div>

        {isProfilePage && userId !== bookOwnerId && (
          <div className="absolute top-[3px] right-2 z-10">
            <button className="cursor-pointer" onClick={toggleMenu}>
              <FiMoreHorizontal size={24} className="text-gray-500 hover:text-gray-800" />
            </button>
            {menuOpen && (
              <div className="absolute top-6 right-0 bg-white shadow-lg rounded-lg w-28 p-1 sm:w-24 sm:p-0.5">
              <Link href={`/books/${bookId}/update`} className="px-1.5 py-0.5 text-xs text-indigo-900 hover:bg-indigo-100 flex items-center sm:px-1 sm:py-0.5 sm:text-2xs">
                <FiEdit size={12} className="inline-block mr-1" />
                Edit
              </Link>
              <button onClick={handleDeleteClick} className="px-1.5 py-0.5 text-xs text-red-900 hover:bg-red-100 flex items-center sm:px-1 sm:py-0.5 sm:text-2xs">
                <FiTrash2 size={12} className="inline-block mr-1" />
                Delete
              </button>
              <Link href={`/books/${bookId}`} className="px-1.5 py-0.5 text-xs text-indigo-900 hover:bg-indigo-100 flex items-center sm:px-1 sm:py-0.5 sm:text-2xs">
                <FiEye size={12} className="inline-block mr-1" />
                View Listing
              </Link>
              <button
                onClick={handleMarkAsSoldClick}
                className="px-1.5 py-0.5 text-xs text-green-900 hover:bg-green-100 flex items-center sm:px-1 sm:py-0.5 sm:text-2xs block sm:hidden md:flex lg:hidden"
              >
                <FiCheck size={12} className="inline-block mr-1" />
                Mark Sold
              </button>
            </div>
            )}
          </div>
        )}

        {isProfilePage && userId !== bookOwnerId && (
          <div className="w-full flex justify-center mt-1 lg:mb-2">
            <button className="tracking-widest align-center font-sans w-full px-2 py-0.5 lg:py-2 shadow-xl bg-gradient-to-r bg-[#155387] text-white text-[9px] font-bold rounded-full hover:bg-gradient-to-r hover:from-red-900 hover:to-red-800" onClick={handleMarkAsSoldClick}>
              Mark as Sold
            </button>
          </div>
        )}
      </div>

      {showDeleteConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete this book?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {showSoldConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to mark this book as sold?"
          onConfirm={handleConfirmSold}
          onCancel={handleCancelSold}
        />
      )}
    </motion.div>
  );
};

const ConfirmationModal = ({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <p className="mb-4">{message}</p>
      <div className="flex justify-end">
        <button onClick={onCancel} className="px-4 py-2 mr-2 text-white bg-red-600 rounded hover:bg-red-700">
          No
        </button>
        <button onClick={onConfirm} className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300">
          Yes
        </button>
      </div>
    </div>
  </div>
);

export default BookCard;