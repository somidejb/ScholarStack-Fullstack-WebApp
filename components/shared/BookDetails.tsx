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
    <div className='center'>
      <div className="font-sans">
        <div className="p-5">
          <div className="flex flex-col lg:flex-row mb-10 items-center justify-center"> {/* Centering the section */}
            <div className="flex flex-col items-center lg:items-start lg:mr-5">
              <div className="flex flex-col space-y-2">
                {thumbnails.map((thumbnail, index) => (
                  <Image
                    key={index}
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    width={120}
                    height={100}
                    className="cursor-pointer border border-gray-300 rounded"
                    onClick={() => setMainImage(thumbnail)}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-center lg:justify-start lg:mr-5">
              <Image
                src={mainImage}
                alt="Main Book Image"
                width={4860}
                height={350}
                className="border border-gray-300 rounded"
              />
            </div>
            <div className="max-w-lg lg:ml-5">
              <h1 className="text-4xl font-bold mb-10">Chain of Gold: The Last Hours</h1>
              <p className="text-2xl mb-20">Cassandra Clare</p>
              <p className="text-3xl font-semibold mb-10">$12.49</p>
              <p className="text-2xl mb-4">
                From #1 New York Times and USA TODAY bestselling author Cassandra Clare comes the first novel in a brand-new trilogy where evil hides in plain sight and love cuts deeper than any blade. Chain of Gold is a Shadowhunters novel.
              </p>
             
              <div> {/* Added relative class */}
              <button className="bg-indigo-900 text-xl text-white px-10 py-2 mr-2 ">Message Seller</button>
  <button className="border border-indigo-900 text-xl text-indigo-900 px-14 py-2 mr-2 relative" > 
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
        <div className="text-lg text-gray-600 ml-0">
            <Collection collection_type="Similar to this.." />
          </div>
      </div>
    </div>
    </div>
  );
};

export default BookDetails;
