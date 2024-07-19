import React from 'react';

const reports = [
  { id: 12356, reporter: 'Sarah Lim', type: 'Inappropriate', date: 'November 17, 2018' },
  { id: 12357, reporter: 'John Doe', type: 'Spam', date: 'November 18, 2018' },
];

const Reports = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Reports</h1>
      <div className="grid gap-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
            <div className="flex items-center ">
              <img
                src="/assets/images/book-admin.png"
                alt="Book Cover"
                className="w-18 h-20 mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">Report ID: {report.id}</h2>
                <p>Reported by: {report.reporter}</p>
                <p>Type: {report.type}</p>
                <p>Date: {report.date}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-800 text-white py-2 px-4 rounded-xl">View More</button>
              <button className="bg-green-700 text-white py-2 px-4 rounded-xl">Resolve</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
