"use client";
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiEye, FiMoreHorizontal } from 'react-icons/fi';
import { createOrder } from '@/lib/actions/order.actions';
import { deleteBook, addFavorite, addFavorite2, removeFavorite2, removeFavorite } from '@/lib/actions/book.actions';

type BookCardProps = {
  userId: string;
  dbUserId: string; // Add dbUserId to props
  bookId: string;
  title: string;
  imageUrl: string;
  author: string;
  price?: string;
  salePrice?: string;
  favorites?: string[];
  bookOwnerId: string;
  isProfilePage?: boolean;
};

const BookCard = ({
  userId,
  dbUserId, // Destructure dbUserId from props
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

  // Log values here to ensure they are being logged
  console.log('dbUserId:', dbUserId);
  console.log('bookOwnerId:', bookOwnerId);
  console.log('userId:', userId);
  console.log('bookId:', bookId);

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

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteBook({ bookId, path: `/profile/${userId}`, page: 'profile' });
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
        await deleteBook({ bookId, path: "/path-to-revalidate", page: 'order' });
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
    <div className="relative rounded-[15px] w-full lg:rounded-[30px] flex h-[135px] md:h-[180px] lg:h-[230px] xl:h-[300px] lg:min-w-[170px] lg:max-w-[200px] xl:min-w-[220px] xl:max-w-[250px] min-w-[104px] md:min-w-[130px] md:max-w-[150px] flex-col card-shadow mb-1">
      <div className="flex flex-col items-start justify-center w-full h-full px-[7px] lg:px-[18px] xl:px-[25px] pt-[10px] md:pt-[13px]">
        <Link
          href={{
            pathname: `/books/${bookId}`,
            query: { favorite: favorite.toString() },
          }}
          className="rounded-[10px] w-full h-[90px] md:h-[120px] lg:h-[210px] xl:h-[300px] overflow-hidden flex-center book-shadow"
        >
          <Image src={imageUrl} alt={title} width={216} height={301} className="object-contain" />
        </Link>

        <p className="pt-[3px] font-bold p-card overflow-hidden line-clamp-1">{title}</p>
        <p className="font-normal p-card line-clamp-1">{author}</p>

        <div className="flex justify-between w-full">
          <div className="flex p-card gap-1">
            {salePrice ? (
              <>
                <p className="font-bold text-red-400">{`$ ${salePrice}`}</p>
                <p className="font-normal text-gray-400 line-through">{price === "0" ? "Free" : `$ ${price}`}</p>
              </>
            ) : (
              <p className="font-bold">{price === "0" ? "Free" : `$ ${price}`}</p>
            )}
          </div>
          <div onClick={toggleFavorite} className="cursor-pointer">
            <Image
              src={favorite ? "/assets/icons/favorite-red.png" : "/assets/icons/favorite.svg"}
              alt="heart"
              width={19}
              height={11}
              className="object-contain w-[12px] md:w-[20px] lg:w-[24px] h-full"
            />
          </div>
        </div>

        {isProfilePage && dbUserId === bookOwnerId && (
          <div className="absolute top-2 right-2 z-10">
            <button className="cursor-pointer" onClick={toggleMenu}>
              <FiMoreHorizontal size={24} className="text-gray-500 hover:text-gray-800" />
            </button>
            {menuOpen && (
              <div className="absolute top-6 right-0 bg-white shadow-lg rounded-lg">
                <Link href={`/books/${bookId}/update`} className="px-4 py-2 text-indigo-900 hover:bg-indigo-100 flex items-center">
                  <FiEdit size={16} className="inline-block mr-2" />
                  Edit
                </Link>
                <button onClick={handleDeleteClick} className="px-4 py-2 text-red-900 hover:bg-red-100 flex items-center">
                  <FiTrash2 size={16} className="inline-block mr-2" />
                  Delete
                </button>
                <Link href={`/books/${bookId}`} className="px-4 py-2 text-indigo-900 hover:bg-indigo-100 flex items-center">
                  <FiEye size={16} className="inline-block mr-2" />
                  View Listing
                </Link>
              </div>
            )}
          </div>
        )}

        {isProfilePage && dbUserId === bookOwnerId && (
          <div className="flex justify-center mt-3 gap-2 mb-3">
            <button className="px-3 py-1 shadow-xl bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-sm rounded-lg hover:bg-gradient-to-r hover:from-red-900 hover:to-red-800" onClick={handleMarkAsSoldClick}>
              Mark as Sold
            </button>
            <button className="px-3 py-1 shadow-xl bg-gradient-to-r from-pink-700 to-indigo-900 text-white text-sm rounded-lg hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-900">
              Still Listed
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
    </div>
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
