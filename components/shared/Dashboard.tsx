// import React from 'react';

// const Dashboard: React.FC = () => {
//   return (
//     <div className="p-6 flex flex-col space-y-8">
//       <div className="flex space-x-4">
//         <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
//           <h3 className="text-2xl font-semibold">Total Subscriptions</h3>
//           <p className="text-4xl font-bold">125</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
//           <h3 className="text-2xl font-semibold">Reports</h3>
//           <p className="text-4xl font-bold">34</p>
//         </div>
//       </div>
//       <div className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4">
//         <div className="flex items-center">
//           <img src="/path-to-image.png" alt="Book Cover" className="w-16 h-16 mr-4"/>
//           <div className="flex-grow">
//             <h4 className="text-lg font-semibold">Report ID: 12356</h4>
//             <p>Reported by: Sarah Lim</p>
//             <p>Type: Inappropriate</p>
//             <p>Date: November 17, 2018</p>
//           </div>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">View More</button>
//           <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Resolve</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// components/Dashboard.tsx


import React, { useState } from 'react';
import BookCardAdmin from './BookCardAdmin';

interface DashboardProps {
  books: {
    title: string;
    postedBy: string;
    date: string;
    price: string;
    imageUrl: string;
  }[];
}

const Dashboard: React.FC<DashboardProps> = ({ books }) => {
  const [bookList, setBookList] = useState(books.map(book => ({ ...book, status: 'default' as 'approved' | 'rejected' | 'default' })));
  const [removingBook, setRemovingBook] = useState<number | null>(null);

  const handleApprove = (index: number) => {
    setRemovingBook(index);
    setBookList(prevBooks => {
      const newBooks = [...prevBooks];
      newBooks[index].status = 'approved';
      return newBooks;
    });
    setTimeout(() => {
      setBookList(prevBooks => prevBooks.filter((_, i) => i !== index));
      setRemovingBook(null);
    }, 500); // Duration should match the CSS transition duration
  };

  const handleReject = (index: number) => {
    setRemovingBook(index);
    setBookList(prevBooks => {
      const newBooks = [...prevBooks];
      newBooks[index].status = 'rejected';
      return newBooks;
    });
    setTimeout(() => {
      setBookList(prevBooks => prevBooks.filter((_, i) => i !== index));
      setRemovingBook(null);
    }, 500); // Duration should match the CSS transition duration
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-900 text-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
          <h2 className="text-center">Total Subscriptions</h2>
          <p className="text-4xl text-center">125</p>
        </div>
        <div className="bg-gray-400 text-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
          <h2 className="text-center">Reports</h2>
          <p className="text-4xl text-center">34</p>
        </div>
      </div>
      <div className="mt-7 space-y-4">
        {bookList.map((book, index) => (
          <div key={index} className={`mb-4 ${removingBook === index ? 'transform translate-x-full opacity-0 transition duration-500 ease-in-out' : ''}`}>
            <BookCardAdmin
              title={book.title}
              postedBy={book.postedBy}
              date={book.date}
              price={book.price}
              imageUrl={book.imageUrl}
              status={book.status}
              onApprove={() => handleApprove(index)}
              onReject={() => handleReject(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
