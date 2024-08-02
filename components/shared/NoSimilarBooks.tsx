// components/shared/NoFavoriteBooks.tsx
import Link from "next/link";
import React from "react";

const NoSimilarBooks: React.FC = () => {
  return (
    <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
      <h3 className="text-gray-600 font-bold mb-2 text-base sm:text-lg lg:text-xl">
      No similar books have been posted yet. Check back soon!
      </h3>
      <Link
        href="../books/upload"
        className="my-1 rounded-md bg-[#31457B] p-3 text-white text-sm transition duration-300 ease-in-out transform hover:bg-[#25395F] hover:shadow-lg hover:scale-105"
      >
        Upload a Book
      </Link>
    </div>
  );
};

export default NoSimilarBooks;
