// // components/BarChart.tsx

// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// interface BarChartProps {
//   data: {
//     date: string;
//     userCount: number;
//   }[];
// }

// const BarChartComponent: React.FC<BarChartProps> = ({ data }) => {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Bar dataKey="userCount" fill="#8884d8" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default BarChartComponent;

// components/BarChart.tsx

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface UserData {
  date: string;
  userCount: number;
}

interface BarChartProps {
  data: UserData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="userCount" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BarChart;

