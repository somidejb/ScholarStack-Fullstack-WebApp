"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiEye, FiMoreHorizontal } from 'react-icons/fi'; // Importing icons from react-icons/fi

import { addFavorite, removeFavorite } from '@/lib/actions/book.actions';

type BookCardProps = {
  userId: string;
  bookId: string;
  title: string;
  imageUrl: string;
  author: string;
  price?: string;
  salePrice?: string;
  favorites?: string[];
  bookOwnerId: string; // Add this prop to check ownership
}

const BookCard = ({ userId, bookId, title, imageUrl, author, price, salePrice, favorites, bookOwnerId }: BookCardProps) => {
  const [favorite, setFavorite] = useState(favorites?.includes(bookId));
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleFavorite = async () => {
    if (favorite) {
      await removeFavorite(userId, bookId);
    } else {
      await addFavorite(userId, bookId);
    }
    setFavorite(!favorite);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative rounded-[15px] w-full lg:rounded-[30px] flex h-[135px] md:h-[180px] lg:h-[287px] xl:h-[394px] lg:min-w-[194px] xl:min-w-[258px] min-w-[104px] md:min-w-[130px] flex-col card-shadow mb-1">
      <div className="flex flex-col items-start justify-center w-full h-full px-[7px] lg:px-[18px] xl:px-[25px] pt-[10px] md:pt-[13px]">
        <Link href={`books/${bookId}`} className="rounded-[10px] w-full h-[90px] md:h-[120px] lg:h-[210px] xl:h-[300px] overflow-hidden flex-center book-shadow">
          <Image src={imageUrl} alt={title} width={216} height={301} className="object-contain" />
        </Link>

        <p className="pt-[3px] font-bold p-card overflow-hidden line-clamp-1">{title}</p>
        <p className="font-normal p-card line-clamp-1">{author}</p>

        <div className="flex justify-between w-full">
          <div className="flex p-card gap-1">
            {salePrice ? (
              <>
                <p className="font-normal text-red-400">{`$ ${salePrice}`}</p>
                <p className="font-normal text-gray-400 line-through">{price === "0" ? "Free" : `$ ${price}`}</p>
              </>
            ) : (
              <p className="font-normal">{price === "0" ? "Free" : `$ ${price}`}</p>
            )}
          </div>
          <Image 
            src={favorite ? "/assets/icons/favorite-red.png" : "/assets/icons/favorite.svg"} 
            alt="heart" 
            width={19} 
            height={11} 
            className={`object-contain w-[12px] md:w-[20px] lg:w-[24px] h-full cursor-pointer`} 
            onClick={toggleFavorite}
          />
        </div>

        {userId === bookOwnerId && (
          <div className="absolute top-2 right-2 z-10">
            <button className="cursor-pointer" onClick={toggleMenu}>
              <FiMoreHorizontal size={24} className="text-gray-500 hover:text-gray-800" />
            </button>
            {menuOpen && (
              <div className="absolute top-6 right-0 bg-white shadow-lg rounded-lg">
                <Link href={`/books/${bookId}/update`} className=" px-4 py-2 text-indigo-900 hover:bg-indigo-100 flex items-center">
                  <FiEdit size={16} className="inline-block mr-2" />
                  Edit
                </Link>
                <Link href={`/books/${bookId}/delete`} className=" px-4 py-2 text-red-900 hover:bg-red-100 flex items-center">
                  <FiTrash2 size={16} className="inline-block mr-2" />
                  Delete
                </Link>
                <Link href={`/books/${bookId}`} className=" px-4 py-2 text-indigo-900 hover:bg-indigo-100 flex items-center">
                  <FiEye size={16} className="inline-block mr-2" />
                  View Listing
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCard;
