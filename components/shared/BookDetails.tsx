"use client";
import { Collection } from '@/components/shared/Collection';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';

type Book = {
  _id: string;
  title: string;
  author: string;
  description: string;
  images: string[];
  price: string;
  salePrice?: string;
};

type BookDetailsProps = {
  book: Book;
};

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  const hasImages = book.images && book.images.length > 0;

  console.log("Book image:", hasImages ? book.images[0] : "No image available");

  if (hasImages) {
    console.log("Primary Image URL:", book.images[0]);
    book.images.slice(1).forEach((imageUrl, index) => {
      console.log(`Thumbnail Image URL ${index + 1}:`, imageUrl);
    });
  } else {
    console.log("No images available for this book.");
  }

  const navigateBack = () => {
    window.history.back(); // Navigate back using browser history
  };

  return (
    <div className="p-2 lg:p-10 lg:mt-2 lg:ml-20">
      <div className="font-sans">
        {/* Button to navigate back to the previous page */}
        <button onClick={navigateBack} className="flex items-center text-indigo-900 left-5 hover:big mb-4">
          <Image
            src="/assets/icons/back.svg"
            alt="Go Back"
            width={15}
            height={20}
            className="mr-2"
          />
          Back to Search
        </button>
        <div className="flex flex-col lg:flex-row items-start justify-start mb-10">
          <div className="w-full lg:w-auto flex justify-center lg:justify-start mb-5 lg:mb-0">
            <div className="relative transition-transform duration-300 ease-in-out transform hover:scale-110 w-[150px] h-[200px] sm:w-[180px] sm:h-[240px] md:w-[290px] md:h-[400px] lg:w-[370px] lg:h-[540px] xl:w-[446px] xl:h-[600px]">
              {hasImages ? (
                <Image
                  src={book.images[0]}
                  alt={book.title}
                  width={208}
                  height={312}
                  className="mb-2"
                />
              ) : (
                <div className="w-[208px] h-[312px] mb-2 bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}
            </div>
          </div>
          <div className="ml-10 md:flex flex-row flex-wrap lg:grid grid-cols-2 lg:gap-10 justify-start lg:mt-0 lg:ml-15">
            {hasImages &&
              book.images.slice(1).map((imageUrl, index) => (
                <Image
                  key={index}
                  src={imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  width={48}
                  height={64}
                  className="mr-2 cursor-pointer"
                />
              ))}
          </div>
        </div>
        <div className="lg:order-last lg:mt-0 text-left lg:ml-5 mt-5">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-lg:mb-2">{book.title}</h1>
          <p className="text-lg md:text-2xl lg:text-xl mb-5 lg:mb-4">{book.author}</p>
          <p className="text-xl md:text-2xl lg:text-4xl font-semibold mb-5 lg:mb-10">Actual price:${book.price}</p>
          {book.salePrice && (
            <p className="text-xl md:text-2xl lg:text-4xl font-semibold mb-5 lg:mb-10">Sale price:${book.salePrice}</p>
          )}
          <p className="text-lg text-indigo-900 md:text-2xl lg:text-xl mb-2 lg:mb-4">{book.description}</p>

          <div className="flex items-center mb-6 lg:mb-10">
            <FaMapMarkerAlt className="mr-2 text-indigo-900" size={20} />
            <span className="text-base md:text-xl lg:text-xl">University Dr, NW, Calgary</span>
          </div>
          <div className="flex space-x-5 md:space-x-10">
            <button className="transition-transform duration-300 ease-in-out transform hover:scale-110 bg-indigo-900 text-sm hover:bg-indigo-700 hover:text-gray-200 hover:shadow-lg lg:text-xl text-white px-5 py-2 lg:px-10 lg:py-2 rounded-lg shadow-md">
              Message Seller
            </button>
            <button className="transition-transform duration-300 ease-in-out transform hover:scale-110 border border-indigo-900 text-sm lg:text-xl text-indigo-900 px-10 py-2 lg:px-14 lg:py-2 relative rounded-lg shadow-md hover:bg-indigo-200 hover:text-indigo-900 hover:shadow-lg">
              Favorite
              <Image
                src="/assets/icons/favorite.svg"
                alt="heart"
                width={19}
                height={11}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 object-contain w-[12px] md:w-[20px] xl:w-[24px] h-full"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="text-lg text-gray-600 mt-10">
        <Collection collection_type="Similar to this..." books={[]} userId={''} />
      </div>
    </div>
  );
};

export default BookDetails;
