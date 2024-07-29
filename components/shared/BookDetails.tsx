import { Collection } from '@/components/shared/Collection';
import BackButton from '@/components/shared/BackButton';
import BookImage from '@/components/shared/BookImage';
import BookThumbnails from '@/components/shared/BookThumbnails';
import BookInfo from '@/components/shared/BookInfo';
import ActionButtons from '@/components/shared/ActionButtons';
import Link from 'next/link';
import Image from 'next/image'; // Import the correct component for the Image element

type Book = {
  _id: string;
  title: string;
  author: string;
  description: string;
  images: string[];
  price: string;
  salePrice?: string;
  location: string;
  bookOwner: {_id: string, firstName: string, lastName:string, photo: string};
  isFavorite?: boolean;
};


type BookDetailsProps = {
  book: Book;
};
 

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  const hasImages = book.images && book.images.length > 0;

  const navigateBack = () => {
    // Add the logic to navigate back
  };

  return (
    <div className="p-2 lg:p-10 lg:mt-2 lg:ml-20">
      <div className="font-sans">
        {/* Button to navigate back to the previous page */}
        <button onClick={navigateBack} className="flex items-center text-indigo-900 left-5 hover:big mb-4">
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
            {hasImages ? (
              <BookImage imageUrl={book.images[0]} title={book.title} />
            ) : (
              <div className="w-[208px] h-[312px] mb-2 bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}
          </div>
          {hasImages && <BookThumbnails images={book.images.slice(1)} />}
          <BookInfo
            title={book.title}
            author={book.author}
            price={book.price}
            salePrice={book.salePrice}
            description={book.description}
            location={book.location}
          />
        </div>
      </div>
      {/* <div className="text-lg text-gray-600 mt-10">
        <Collection collection_type="Similar to this..." books={[]} userId={''} />
      </div> */}
    </div>
  );
};
 
export default BookDetails;
