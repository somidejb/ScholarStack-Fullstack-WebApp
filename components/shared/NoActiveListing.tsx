// components/shared/NoActiveListings.tsx
import Link from "next/link";
import React from "react";

const NoActiveListings: React.FC = () => {
  return (
    <div className="text-center py-10">
      <h3 className="text-lg font-bold mb-2">
        You don&apos;t have any active listings
      </h3>
      <p className="text-gray-600">
        Add a new listing to start selling your books.
      </p>
      <Link
        href="../books/upload"
        className="my-1 rounded-md bg-[#31457B] p-3 text-white text-sm transition duration-300 ease-in-out transform hover:bg-[#25395F] hover:shadow-lg hover:scale-105"
      >
        Upload a Book
      </Link>
    </div>
  );
};

export default NoActiveListings;
