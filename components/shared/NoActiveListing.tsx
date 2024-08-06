// components/shared/NoActiveListings.tsx
import Link from "next/link";
import React from "react";

const NoActiveListings: React.FC = () => {
  return (
    <div className="text-center max-sm:py-6 py-10 px-4 sm:px-6 lg:px-8">
      <h3 className="text-gray-600 font-bold mb-2 text-base sm:text-lg lg:text-xl">
        You don&apos;t have any active listings
      </h3>
      <p className="text-sm sm:text-base lg:text-lg mb-4">
        Add a new listing to start selling your books.
      </p>
      <Link
        href="../books/upload"
        className="inline-block my-1 rounded-md bg-[#31457B] py-2 px-4 text-white text-sm sm:text-base lg:text-lg"
      >
        Upload a Book
      </Link>
    </div>
  );
};

export default NoActiveListings;
