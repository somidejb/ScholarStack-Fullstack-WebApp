"use client";

import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import Image from "next/image";
import Link from "next/link";
import { IBook } from "@/lib/mongodb/database/models/book.model";
import { getFavorites} from '@/lib/actions/book.actions'


type CollectionProps = {
  collection_type: string;
  books: IBook[];
  userId: string;
};

export const Collection = ({ collection_type, books, userId }: CollectionProps) => {
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
        const favorites: IBook[] = await getFavorites(userId);
        setFavorites(favorites.map(favorite => favorite._id)); // Map to array of strings (book IDs)
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchFavorites();
  }, [userId]);

  const totalSlides = Math.ceil(books.length / cardsPerSlide);

  const handlePrevClick = () => {
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : totalSlides - 1);
  };

  const handleNextClick = () =>
    setCurrentSlide((currentSlide + 1) % totalSlides);

  const renderDots = () => {
    return Array.from({ length: totalSlides }).map((_, index) => (
      <span
        key={index}
        className={`h-2 w-2 md:h-3 md:w-3 rounded-full mx-1 cursor-pointer ${
          currentSlide === index ? "bg-blue-500" : "bg-gray-500"
        }`}
        onClick={() => setCurrentSlide(index)}
      />
    ));
  };

  return (
    <section className="mt-[60px] lg:mt-[88px] items-center flex flex-col ml">
      <h2 className="text-center leading-[27px] md:leading-[36px] lg:leading-[73px] text-[22px] md:text-[30px] lg:text-[42px] tracking-widest font-normal">
        {collection_type}
      </h2>
      <div className="w-full card-center flex items-center mt-[8px] md:mt-[38px] lg:mt-[50px] relative">
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
                  author={book.author}
                  price={book.price}
                  userId={userId}
                  bookId={book._id}
                  key={book._id}
                  salePrice={book.salePrice}
                  favorites={favorites}
                />
              </div>
            ))}
          </div>
        </div>
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
      <div className="flex w-full items-center mt-[24px] md:mt-[30px] card-center">
        <div className="flex justify-center flex-grow">{renderDots()}</div >
        <Link href="">
          <p className="cursor-pointer text-normal leading-[16px] md:leading-[23px] lg:leading-[32px] text-[11px] md:text-[16px] lg:text-[23px] tracking-widest text-[#2F27CE]">
            See more
          </p>
        </Link>
      </div>
    </section>
  );
};
