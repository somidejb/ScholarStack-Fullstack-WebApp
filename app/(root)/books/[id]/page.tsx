"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Collection } from '@/components/shared/Collection';
import { FaMapMarkerAlt } from 'react-icons/fa';

const BookDetails = () => {
  const thumbnails = [
    '/assets/images/bookd3.png',
    '/assets/images/bookd3.png',
    '/assets/images/bookd3.png',
    '/assets/images/bookd4.png',
  ];

  const [mainImage, setMainImage] = useState('/assets/images/bookd0.png');

  const navigateBack = () => {
    window.history.back(); // Navigate back using browser history
  }

  return (
    <div className="p-5">
      <div className="font-sans">
        {/* Button to navigate back to the previous page */}
        <button onClick={navigateBack} className="flex items-center text-indigo-900 left-5 hover:underline mb-4">
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
            <div className="relative w-[150px] h-[200px] sm:w-[180px] sm:h-[240px] md:w-[290px] md:h-[400px] lg:w-[370px] lg:h-[540px] xl:w-[446px] xl:h-[632px]">
              <Image  
                src={mainImage}
                alt="Main Book Image"
                layout="fill"
                objectFit="cover"
                className="border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="flex flex-row flex-wrap lg:flex-col justify-start space-x-2 lg:space-x-0 lg:space-y-2 mt-5 lg:mt-0 lg:ml-5">
            {thumbnails.map((thumbnail, index) => (
              <div key={index} className="flex items-center justify-center border border-gray-300 rounded shadow-lg w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[150px] p-1">
                <Image
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="cursor-pointer border border-gray-300 rounded"
                  onClick={() => setMainImage(thumbnail)}
                />
              </div>
            ))}
          </div>
          <div className="lg:order-last lg:mt-0 max-w-lg text-left lg:ml-5 mt-5">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb- lg:mb-2">Chain of Gold: The Last Hours</h1>
            <p className="text-lg md:text-2xl lg:text-xl mb-5 lg:mb-4">Cassandra Clare</p>
            <p className="text-xl md:text-2xl lg:text-4xl font-semibold mb-5 lg:mb-10">$12.49</p>
            
            <p className="text-lg text-indigo-900 md:text-2xl lg:text-xl mb-2 lg:mb-4">Book Description:</p>
            <p className="text-base md:text-xl lg:text-xl mb-5 lg:mb-10 leading-[18px] md:leading-[18px] xl:leading-[32px]">
              From #1 New York Times and USA TODAY bestselling author Cassandra Clare comes the first novel in a brand-new trilogy where evil hides in plain sight and love cuts deeper than any blade. Chain of Gold is a Shadowhunters novel.
            </p>
            <div className="flex items-center mb-6 lg:mb-10">
              <FaMapMarkerAlt className="mr-2 text-indigo-900" size={20} />
              <span className="text-base md:text-xl lg:text-xl">University Dr, calagry</span>
            </div>
            <div className="flex space-x-5 md:space-x-10">
              <button className="bg-indigo-900 text-sm lg:text-xl text-white px-5 py-2 lg:px-10 lg:py-2 rounded-lg shadow-md hover:shadow-lg">Message Seller</button>
              <button className="border border-indigo-900 text-sm lg:text-xl text-indigo-900 px-10 py-2 lg:px-14 lg:py-2 relative rounded-lg shadow-md hover:shadow-lg">
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
      </div>
      <div className="text-lg text-gray-600 mt-10">
        <Collection collection_type="Similar to this..." />
      </div>
    </div>
  );
};

export default BookDetails;
