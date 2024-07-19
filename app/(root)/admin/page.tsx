// // pages/admin/page.tsx
// "use client";

// import React from 'react';
// import Sidebar from '@/components/shared/SideBar';
// import Dashboard from '@/components/shared/Dashboard';
// import Reports from '@/components/shared/Reports';
// import { usePathname } from 'next/navigation';
// import { GetServerSideProps } from 'next';

// interface AdminPageProps {
//   books: {
//     title: string;
//     postedBy: string;
//     date: string;
//     price: string;
//     imageUrl: string;
//   }[];
// }

// const AdminPage: React.FC<AdminPageProps> = ({ books }) => {
//   const pathname = usePathname();

//   const renderComponent = () => {
//     switch (pathname) {
//       case '/admin/dashboard':
//         return <Dashboard books={books} />;
//       case '/admin/reports':
//         return <Reports />;
//       default:
//         return <Dashboard books={books} />;
//     }
//   };

//   return (
//     <div className="flex bg-slate-100">
//       <Sidebar />
//       <div className="flex-grow p-8">
//         <input
//           placeholder="Search chat.."
//           className="px-5 py-2.5 border shadow-md w-full rounded-2xl bg-white outline-none hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out"
//         />
//         {renderComponent()}
//       </div>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async () => {
//   // Replace this with your actual data fetching logic
//   const books = [
//     {
//       title: 'Book Lovers by Emily Henry',
//       postedBy: 'Sarah Lim',
//       date: 'February 14, 2024',
//       price: '$15.81',
//       imageUrl: '/assets/images/book-admin.png',
//     },
//     {
//       title: 'Another Book by Another Author',
//       postedBy: 'John Doe',
//       date: 'March 1, 2024',
//       price: '$12.99',
//       imageUrl: '/assets/images/book-admin.png',
//     },
//     // Add more book objects as needed
//   ];

//   return {
//     props: {
//       books,
//     },
//   };
// };

// export default AdminPage;


// app/(root)/admin/page.tsx
import React from 'react';
import Sidebar from '@/components/shared/SideBar';
import Dashboard from '@/components/shared/Dashboard';
import Reports from '@/components/shared/Reports';
import { fetchAllBooksAdmin } from '@/lib/actions/book.actions';

const AdminPage = async () => {
  const books = await fetchAllBooksAdmin();
  console.log(books);

  return (
    <div className="flex bg-slate-100  ">
      <Sidebar />
      <div className="flex-grow p-8 ">
        <Dashboard books={books} />
      </div>
    </div>
  );
};

export default AdminPage;
