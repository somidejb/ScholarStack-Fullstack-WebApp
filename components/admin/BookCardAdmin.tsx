import React from 'react';
import Image from 'next/image';

interface BookCardAdminProps {
  title: string;
  postedBy: string;
  date: string;
  price: string;
  imageUrl: string;
  onApprove: () => void;
  onReject: () => void;
  status: 'approved' | 'rejected' | 'default';
  className?: string;
}

const BookCardAdmin: React.FC<BookCardAdminProps> = ({ title, postedBy, date, price, imageUrl, onApprove, onReject, status, className }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'approved':
        return 'bg-green-100'; // Pale green background for approved
      case 'rejected':
        return 'bg-red-100'; // Pale red background for rejected
      default:
        return 'bg-white'; // Default background
    }
  };

  return (
    <div className={`p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl shadow-md flex flex-col space-y-4 hover:shadow-lg transition duration-200 ease-in-out ${getStatusClass()} ${className}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-4">
        <Image
          src={imageUrl}
          alt="Book Cover"
          width={160} // Responsive width
          height={200} // Responsive height
          className="w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-36 xl:w-36 xl:h-40 object-cover"
        />
        <div className="flex-grow mt-4 md:mt-0">
          <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold">Title: {title}</h4>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Posted by: {postedBy}</p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Date: {date}</p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Price: {price}</p>
        </div>
        <div className="flex flex-col md:flex-row mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-2">
          <button
            onClick={onApprove}
            className={`bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl ${status === 'approved' ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={status === 'approved'}
          >
            Approve
          </button>
          <button
            onClick={onReject}
            className={`bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl ${status === 'rejected' ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={status === 'rejected'}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCardAdmin;
