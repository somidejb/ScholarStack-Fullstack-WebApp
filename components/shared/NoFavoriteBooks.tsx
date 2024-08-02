// components/shared/NoFavoriteBooks.tsx
import Link from "next/link";
import React from "react";

const NoFavoriteBooks: React.FC = () => {
  return (
    <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
      <h3 className="text-gray-600 font-bold mb-2 text-base sm:text-lg lg:text-xl">
        You don&apos;t have any favorite books
      </h3>
      <p className="text-sm sm:text-base lg:text-lg mb-4">
        Browse books and add them to your favorites list.
      </p>
      <Link href="/books" className="inline-block my-1 rounded-md bg-[#31457B] py-2 px-4 text-white text-sm sm:text-base lg:text-lg">
          Explore Books
      </Link>
    </div>
  );
};

export default NoFavoriteBooks;
