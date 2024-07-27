
import React from 'react';
import { Collection } from '@/components/shared/Collection';
import { IBook } from '@/lib/mongodb/database/models/book.model';

type SimilarBooksProps = {
  similarBooks: IBook[];
};

const SimilarBooks: React.FC<SimilarBooksProps> = ({ similarBooks }) => {
  return (
    <div className="text-lg text-gray-600 mt-10">
      <Collection
        collection_type="Similar to this..."
        books={similarBooks}
        userId={""}
      />
    </div>
  );
};

export default SimilarBooks;
