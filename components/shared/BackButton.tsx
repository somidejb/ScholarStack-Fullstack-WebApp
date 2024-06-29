'use client';

import React from 'react';
import Image from 'next/image';

const BackButton: React.FC = () => {
  const navigateBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back(); // Navigate back using browser history
    }
  };

  return (
    <button onClick={navigateBack} className="flex items-center text-indigo-900 left-5 hover:big mb-4">
      <Image
        src="/assets/icons/back.svg"
        alt="Go Back"
        width={15}
        height={20}
        className="mr-2"
      />
      Back to Search
    </button>
  );
};

export default BackButton;
