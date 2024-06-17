import React, { useEffect, useState } from 'react';

const LoadingSpinner = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length === 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
      <p className="text-lg font-bold font-serif italic">Loading{dots}</p>
      <style jsx>{`
        .loader {
          border-top-color: #31457b;
          -webkit-animation: spin 1s ease-in-out infinite;
          animation: spin 1s ease-in-out infinite;
        }
        @-webkit-keyframes spin {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
