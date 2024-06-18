"use client";
import React from 'react';
import Image from 'next/image';

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

  return (
    <div className="flex font-sans">
      <div className="flex-1 p-5">
        <div className="flex mb-10">
          <div className="mr-5">
            {hasImages ? (
              <Image
                src={book.images[1]}
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
            <div className="flex">
              {hasImages &&
                book.images.slice(1).map((imageUrl, index) => (
                  <Image
                    key={index}
                    src={book.images[0]}
                    alt={`Thumbnail ${index + 1}`}
                    width={48}
                    height={64}
                    className="mr-2 cursor-pointer"
                  />
                ))}
            </div>
          </div>
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
            <p className="text-lg mb-2">{book.author}</p>
            <p className="text-xl font-semibold mb-4">Actual price: ${book.price}</p>
            {book.salePrice && <p className="text-xl font-semibold mb-4">Sale Price: ${book.salePrice}</p>}
            <p className="mb-4">{book.description}</p>
            <button className="bg-indigo-500 text-white px-4 py-2 mr-2">Message Seller</button>
            <button className="border border-blue-500 text-blue-500 px-4 py-2">Favorite</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
