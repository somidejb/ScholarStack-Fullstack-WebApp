"use client";
import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import Image from "next/image";
import Link from "next/link";
import { IBook } from "@/lib/mongodb/database/models/book.model";
import { getFavorites, getFavorites2 } from '@/lib/actions/book.actions';
import NoActiveListings from "./NoActiveListing";
import NoFavoriteBooks from "./NoFavoriteBooks";
import NoSimilarBooks from "./NoSimilarBooks";

type CollectionProps = {
  collection_type: string;
  books: IBook[];
  dbUserId: string;
  userId: string;
  isProfilePage?: boolean;
  currentUserClerkId?: string;
  username?: string;
  currentUserDbId?: string;
};

export const Collection = ({ collection_type, books, userId, dbUserId, isProfilePage, currentUserClerkId, username, currentUserDbId }: CollectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setCardsPerSlide(Math.max(3, Math.floor((width - 1024) / 140) + 1));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        let favoriteBooks: IBook[];
        if (typeof window !== "undefined" && window.location.pathname.startsWith("/profile")) {
          favoriteBooks = await getFavorites(userId); // Use clerkId here if appropriate
        } else {
          favoriteBooks = await getFavorites2(userId);
        }
        const favoriteIds = favoriteBooks.reduce<string[]>((acc, favorite) => {
          acc.push(favorite._id);
          return acc;
        }, []);
        setFavorites(favoriteIds);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  const totalSlides = Math.ceil(books.length / cardsPerSlide);

  const handlePrevClick = () => {
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : totalSlides - 1);
  };

  const handleNextClick = () => setCurrentSlide((currentSlide + 1) % totalSlides);

  const renderDots = () => {
    return Array.from({ length: totalSlides }).map((_, index) => (
      <span
        key={index}
        className={`h-2 w-2 md:h-3 md:w-3 rounded-full ml-2 cursor-pointer ${
          currentSlide === index ? "bg-blue-500" : "bg-gray-500"
        }`}
        onClick={() => setCurrentSlide(index)}
      />
    ));
  };

  return (
<section className="mt-[60px] max-md:mt-[40px] items-center flex flex-col w-full">
  <h2 className="text-center leading-[27px] md:leading-[36px] lg:leading-[73px] text-[22px] md:text-[30px] lg:text-[42px] tracking-widest font-normal">
    {isProfilePage && userId === currentUserClerkId ? (
      collection_type
    ) : !isProfilePage ? (
      collection_type
    ) : (
      `${username}'s Listings`
    )}
  </h2>
  <div className="w-full card-center flex items-center mt-[8px] md:mt-[38px] relative">
    <div
      onClick={handlePrevClick}
      className="absolute z-10 left-[12px] md:left-[30px] lg:left-[45px] cursor-pointer"
    >
      <Image
        src="/assets/icons/left-icon.png"
        alt="Left Arrow"
        width={24}
        height={24}
      />
    </div>
    {books.length === 0 ? (
      <div className="flex justify-center items-center w-full">
        {collection_type === "My Favorite Books" ? (
          <NoFavoriteBooks />
        ) : collection_type === "Similar to this..." ? (
          <NoSimilarBooks />
        ) : (
          <NoActiveListings />
        )}
      </div>
    ) : (
      <div className="flex overflow-hidden w-full">
        <div
          className="flex gap-[22px] md:gap-[36px] transition-transform duration-500"
          style={{
            transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
          }}
        >
          {books.map((book) => (
            <div
              key={book._id}
              className={`flex w-[${100 / cardsPerSlide}%]`}
            >
              <BookCard
                title={book.title}
                imageUrl={book.imageURLs[1]}
                dbUserId={dbUserId} 
                author={book.author}
                price={book.price}
                userId={userId}
                bookId={book._id}
                salePrice={book.salePrice}
                favorites={favorites}
                bookOwnerId={book.bookOwner._id}
                isProfilePage={isProfilePage}
                currentUserDbId={currentUserDbId}
              />
            </div>
          ))}
        </div>
      </div>
    )}
    <div
      onClick={handleNextClick}
      className="absolute right-[12px] md:right-[30px] lg:right-[45px] z-10 cursor-pointer"
    >
      <Image
        src="/assets/icons/right-icon.png"
        alt="Right Arrow"
        width={24}
        height={24}
      />
    </div>
  </div>
  <div className={`${collection_type === ("My Listings" || "My Favorite Books") && books.length === 0 ? "hidden" : "flex w-full justify-between items-center mt-[24px] md:mt-[30px] card-center"}`}>
    <div className="flex justify-center flex-grow">{renderDots()}</div>
    <Link href="/books" className="ml-auto">
      <p className="cursor-pointer text-normal leading-[16px] md:leading-[23px] lg:leading-[32px] text-[11px] md:text-[16px] lg:text-[23px] tracking-widest text-[#2F27CE]">
        See more
      </p>
    </Link>
  </div>
</section>

  );
};
