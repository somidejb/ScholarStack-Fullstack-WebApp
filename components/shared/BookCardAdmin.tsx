// components/shared/BookCardAdmin.tsx
import React from 'react';

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
        return 'bg-pastel-green';
      case 'rejected':
        return 'bg-pastel-red';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className={`p-6 rounded-xl shadow-md flex flex-col space-y-4 hover:shadow-lg transform transition duration-200 ease-in-out ${getStatusClass()} ${className}`}>
      <div className="flex flex-col md:flex-row items-center md:space-x-4">
        <img
          src={imageUrl}
          alt="Book Cover"
          className="w-24 h-28 md:w-20 md:h-24"
        />
        <div className="flex-grow">
          <h4 className="text-lg font-semibold">Title: {title}</h4>
          <p>Posted by: {postedBy}</p>
          <p>Date: {date}</p>
          <p>Price: {price}</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button onClick={onApprove} className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Approve
          </button>
          <button onClick={onReject} className="bg-red-600 text-white px-4 py-2 rounded-lg">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCardAdmin;
