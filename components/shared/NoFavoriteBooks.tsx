// components/shared/NoFavoriteBooks.tsx
import Link from 'next/link';
import React from 'react';

const NoFavoriteBooks: React.FC = () => {
  return (
    <div className="text-center py-10">
      <h3 className="text-gray-600 font-bold mb-2">
        You don&apos;t have any favorite books
      </h3>
      <p className="text-lg">
        Browse books and add them to your favorites list.
      </p>
      <Link href="/books" className="my-1 rounded-md bg-[#31457B] p-2 text-white text-sm">
        Explore Books
      </Link>
    </div>
  );
};

export default NoFavoriteBooks;
