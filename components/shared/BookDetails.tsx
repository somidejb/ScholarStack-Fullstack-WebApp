"use client";
import React, { useState } from 'react';
import Nav from './Nav';
import Image from 'next/image';
import { Collection } from './Collection';
 
const BookDetails = () => {
  const [mainImage, setMainImage] = useState('/assets/images/bookd0.png');
 
  const thumbnails = [
    '/assets/images/bookd1.png',
    '/assets/images/bookd2.png',
    '/assets/images/bookd3.png',
    '/assets/images/bookd4.png',
  ];
 
  return (
    <div className="center">
      <div className="font-sans">
        <div className="p-5">
          <div className="flex flex-col md:flex-row mb-10 items-center justify-center">
            <div className="flex md:hidden flex-wrap justify-center mb-5 space-x-2">
              {thumbnails.map((thumbnail, index) => (
                <div key={index} className="flex items-center justify-center border border-gray-300 rounded shadow-lg p-2 w-20 h-20">
                  <Image
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="cursor-pointer border border-gray-300 rounded"
                    onClick={() => setMainImage(thumbnail)}
                  />
                </div>
              ))}
            </div>
            <div className="hidden md:flex flex-col items-center md:mr-5 space-y-2">
              {thumbnails.map((thumbnail, index) => (
                <div key={index} className="flex flex-col items-center justify-center border border-gray-300 rounded shadow-lg p-2 w-40 h-35">
                  <Image
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="cursor-pointer border border-gray-300 rounded mb-2"
                    onClick={() => setMainImage(thumbnail)}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start md:mr-5">
              <div className="flex justify-center md:justify-start md:mr-5 w-full md:w-auto">
                <div className="relative w-64 h-96 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[500px]">
                  <Image
                    src={mainImage}
                    alt="Main Book Image"
                    layout="fill"
                    objectFit="cover"
                    className="border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="max-w-lg md:ml-5 text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-bold mb-5 md:mb-10">Chain of Gold: The Last Hours</h1>
                <p className="text-lg md:text-2xl mb-10 md:mb-20">Cassandra Clare</p>
                <p className="text-xl md:text-3xl font-semibold mb-5 md:mb-10">$12.49</p>
                <p className="text-lg md:text-2xl mb-4">
                  From #1 New York Times and USA TODAY bestselling author Cassandra Clare comes the first novel in a brand-new trilogy where evil hides in plain sight and love cuts deeper than any blade. Chain of Gold is a Shadowhunters novel.
                </p>
                <div>
                  <button className="bg-indigo-900 text-sm md:text-xl text-white px-5 py-2 md:px-10 md:py-2 mr-2">Message Seller</button>
                  <button className="border border-indigo-900 text-sm md:text-xl text-indigo-900 px-7 py-2 md:px-14 md:py-2 relative">
                    Favorite
                    <Image
                      src="/assets/icons/favorite.svg"
                      alt="heart"
                      width={19}
                      height={11}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 object-contain w-[12px] md:w-[20px] lg:w-[24px] h-full"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-lg text-gray-600 ml-0">
            <Collection collection_type="Similar to this.." />
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default BookDetails;