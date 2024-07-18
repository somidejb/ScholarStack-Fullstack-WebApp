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
import React from 'react';

const Dashboard = () => {
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
      <div className="mt-7">
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col space-y-4 hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
          <div className="flex flex-col md:flex-row items-center md:space-x-4">
            <img
              src="/assets/images/book-admin.png"
              alt="Book Cover"
              className="w-24 h-28 md:w-20 md:h-24"
            />
            <div className="flex-grow">
              <h4 className="text-lg font-semibold">Title: Book Lovers by Emily Henry</h4>
              <p>Posted by: Sarah Lim</p>
              <p>Date: February 14, 2024</p>
              <p>Price: $15.81</p>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Approved
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
                Rejected
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
