"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { addFavorite, removeFavorite } from '@/lib/actions/book.actions';

type BookCardProps = {
  userId: string;
  bookId: string;
  title: string;
  imageUrl: string;
  author: string;
  price?: string;
  salePrice?: string;
  isFavorite?: boolean; // Add isFavorite prop
  favorites?: string[];
}

const BookCard = ({ userId, bookId, title, imageUrl, author, price, salePrice, favorites }: BookCardProps) => {
  const [favorite, setFavorite] = useState(favorites?.includes(bookId));

  const toggleFavorite = async () => {
    if (favorite) {
      await removeFavorite(userId, bookId);
    } else {
      await addFavorite(userId, bookId);
    }
    setFavorite(!favorite);
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
              <p className="font-normal">{price === "0" ? "FREE" : `$ ${price}`}</p>
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
      </div>
    </div>
  );
}

export default BookCard;
