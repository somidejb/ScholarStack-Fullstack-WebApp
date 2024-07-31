"use client";
// // app/admin/subscription/page.tsx

// import React from 'react';
// import BarChartComponent from '@/components/shared/BarChart';
// import { connectToDatabase } from '@/lib/mongodb/database';
// import User from '@/lib/mongodb/database/models/user.model';
// import { error } from 'console';

// const fetchUserData = async () => {
//   await connectToDatabase();
 

//   const endDate = new Date();
//   const startDate = new Date();
//   startDate.setDate(startDate.getDate() - 15);
  

//   const users = await User.aggregate([
//     {
//       $match: {
//         joinedAt: { $gte: startDate, $lte: endDate },
//       },
//     },
//     {
//       $project: {
//         month: { $month: "$joinedAt" },
//         year: { $year: "$joinedAt" },
//       },
//     },
//     {
//       $group: {
//         _id: { month: "$month", year: "$year" },
//         userCount: { $sum: 1 },
//       },
//     },
//     {
//       $sort: { "_id.year": 1, "_id.month": 1 },
//     },
//   ]);

//   return users.map(user => ({
//     date: `${user._id.month}/${user._id.year}`,
//     userCount: user.userCount,
//   }));
// };

// const SubscriptionPage = async () => {
//   const userData = await fetchUserData();

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold mb-4">User Subscription Data</h1>
//       <BarChartComponent data={userData} />
//     </div>
//   );
// };

// export default SubscriptionPage;


// pages/admin/subscription.tsx


import React, { useEffect, useState } from 'react';
import BarChart from '@/components/shared/BarChart';

interface User {
  joinedAt: string;
}

const SubscriptionPage: React.FC = () => {
  const [data, setData] = useState<{ date: string; userCount: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/users');
        const users: User[] = await response.json();

        // Process the user data into the format required for the chart
        const userCounts: { [key: string]: number } = {};
        users.forEach(user => {
          const date = new Date(user.joinedAt).toISOString().split('T')[0]; 
          userCounts[date] = (userCounts[date] || 0) + 1;
        });

        const chartData = Object.keys(userCounts).map(date => ({
          date,
          userCount: userCounts[date],
        }));

        setData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Subscription Statistics</h1>
      <BarChart data={data}/>
    </div>
  );
};

export default SubscriptionPage;
