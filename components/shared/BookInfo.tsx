import { FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';

type BookInfoProps = {
  title: string;
  author: string;
  price: string;
  salePrice?: string;
  description: string;
  location: string;
};

const BookInfo: React.FC<BookInfoProps> = ({ title, author, price, salePrice, description, location }) => {
  return (
    <div className="ml-8 flex flex-col justify-start space-x-2 lg:space-x-0 lg:space-y-2 mt-0 max-w-lg text-left lg:ml-5">
      <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-0">{title}</h1>
      <p className="text-lg md:text-xl lg:text-xl mb-20">Author: {author}</p>
      <p className="text-xl md:text-2xl lg:text-2xl font-semibold mb-5 lg:mb-0">Actual price: ${price}</p>
      {salePrice && (
        <p className="text-xl md:text-xl text-indigo-900 lg:text-2xl font-semibold">Sale price: ${salePrice}</p>
      )}
      <p className="text-lg text-indigo-900 md:text-2xl lg:text-xl mb-9 lg:mb-4">{description}</p>
      <div className="flex items-center mb-6 lg:mb-10">
        <FaMapMarkerAlt className="mr-2 text-indigo-900" size={20} />
        <span className="text-base md:text-xl lg:text-xl">{location}</span>
      </div>
      <div className="mt-10 flex space-x-5 md:space-x-10">
              <button className="mt-20 transition-transform duration-300 ease-in-out transform hover:scale-110 bg-indigo-900 text-sm hover:bg-indigo-700 hover:text-gray-200 hover:shadow-lg lg:text-xl text-white px-5 py-2 lg:px-10 lg:py-2 rounded-lg shadow-md">
                Message Seller
              </button>
              <button className="mt-20 transition-transform duration-300 ease-in-out transform hover:scale-110 border border-indigo-900 text-sm lg:text-xl text-indigo-900 px-10 py-2 lg:px-14 lg:py-2 relative rounded-lg shadow-md hover:bg-indigo-200 hover:text-indigo-900 hover:shadow-lg">
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
  );
};

export default BookInfo;
