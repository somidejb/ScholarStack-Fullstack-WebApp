"use client"
import Image from 'next/image';

type BookThumbnailsProps = {
  images: string[];
};

const BookThumbnails: React.FC<BookThumbnailsProps> = ({ images }) => {
  return (
    <div className="ml-8 flex flex-row flex-wrap lg:flex-col justify-start space-x-2 lg:space-x-0 lg:space-y-2 mt-0 lg:mt-0 lg:ml-5">
      {images.map((imageUrl, index) => (
        <Image
          key={index}
          src={imageUrl}
          alt={`Thumbnail ${index + 1}`}
          width={200}
          height={200}
          className="mr-2 cursor-pointer p-2 flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 border border-gray-300 rounded shadow-lg w-[70px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[150px]"
          onClick={() => console.log(`Thumbnail ${index + 1} clicked`)}
        />
      ))}
    </div>
  );
};

export default BookThumbnails;
