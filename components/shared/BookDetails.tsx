"use client";
import React from 'react';
import Image from 'next/image';
import { Collection } from './Collection';

const BookDetails = () => {
  return (
    <div className="flex font-sans">
      <div className="flex-1 p-5">
        <div className="flex mb-10">
          <div className="mr-5">
            <Image
              src="/assets/images/bookd0.png"
              alt="Chain of Gold: The Last Hours"
              width={208}
              height={312}
              className="mb-2"
            />
            <div className="flex">
              <Image
                src="/assets/images/bookd1.png"
                alt="Thumbnail 1"
                width={48}
                height={64}
                className="mr-2 cursor-pointer"
              />
              <Image
                src="/assets/images/bookd2.png"
                alt="Thumbnail 2"
                width={48}
                height={64}
                className="mr-2 cursor-pointer"
              />
              <Image
                src="/assets/images/bookd3.png"
                alt="Thumbnail 3"
                width={48}
                height={64}
                className="mr-2 cursor-pointer"
              />
              <Image
                src="/assets/images/bookd4.png"
                alt="Thumbnail 4"
                width={48}
                height={64}
                className="mr-2 cursor-pointer"
              />
            </div>
          </div>
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold mb-2">Chain of Gold: The Last Hours</h2>
            <p className="text-lg mb-2">Cassandra Clare</p>
            <p className="text-xl font-semibold mb-4">$12.49</p>
            <p className="mb-4">
              From #1 New York Times and USA TODAY bestselling author Cassandra Clare comes the first novel in a brand-new trilogy where evil hides in plain sight and love cuts deeper than any blade. Chain of Gold is a Shadowhunters novel.
            </p>
            <button className="bg-indigo-500 text-white px-4 py-2 mr-2">Message Seller</button>
            <button className="border border-blue-500 text-blue-500 px-4 py-2">Favorite</button>
          </div>
        </div>
        <Collection collection_type="Similar to this.." books={[]} />
      </div>
    </div>
  );
};

export default BookDetails;
